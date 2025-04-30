import os
import sys
from asyncio import sleep
from contextlib import asynccontextmanager
from datetime import UTC, datetime, timedelta

from beanie import init_beanie
from fastapi import Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_events.dispatcher import dispatch
from fastapi_events.handlers.local import local_handler
from fastapi_events.middleware import EventHandlerASGIMiddleware
from loguru import logger
from pymongo.errors import OperationFailure

from app.config.database import connect_db
from app.config.settings import settings
from app.models.beanie import UserDocument, models
from app.models.pydantic import TokenModel
from app.models.utils.common import get_graphql_error_response
from app.PatchedApi import PatchedFastAPI
from app.schemas.schema import AuthorizationService, graphql_router

environment = os.getenv("ENVIRONMENT")

# if environment == "production":
#     sys.tracebacklimit = 0

# The subprocess is used to run the watcher in a separate process
# to avoid blocking the main process and to watch DB events
# p = subprocess.run(["python", "-m", "app.watch"], stdout=sys.stdout, stderr=sys.stderr)


@asynccontextmanager
async def lifespan(app: PatchedFastAPI):
    connect_db(app)
    try:
        print("Now trying to initialize the beanie!")
        await init_beanie(database=app.db, document_models=models)
        print("Success with beanie!")
    except OperationFailure:
        print("Could not initialize Beanie... Retrying...")
        sleep_time = 3
        logger.warning(
            "It seems the Beanie could not initialize due to DB connection failure."
        )
        logger.warning(f"Sleeping for {sleep_time} seconds and trying again...")
        await sleep(sleep_time)
        logger.warning("Trying again...")
        try:
            await init_beanie(database=app.db, document_models=models)
        except Exception as e:
            print("Still could not initialize Beanie... Retrying...")
            logger.error(e)
    yield
    app.mongo_client.close()
    logger.error("Closed mongo client connection to DB")


def create_application() -> PatchedFastAPI:
    """Create the FastAPI application.

    Returns:
        FastAPI: created app.
        FastAPI: created app.
    """
    logger.info("Creating app...")
    app = PatchedFastAPI(
        title=settings.TITLE,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
        docs_url="/api/docs",
        lifespan=lifespan,
    )

    app.include_router(graphql_router, prefix=settings.GRAPHQL_PREFIX)
    return app


app = create_application()
event_handler_id: int = id(app)
app.add_middleware(
    EventHandlerASGIMiddleware, handlers=[local_handler], middleware_id=event_handler_id
)


def is_token_near_expiration(payload):
    exp = payload["exp"]
    now = datetime.now(UTC)
    expiration_time = datetime.fromtimestamp(exp, tz=UTC)
    # Refresh token if the API his is 10 minutes or less
    # before the token expiration
    td = timedelta(seconds=600)
    five_minutes_before_expiration = expiration_time - td
    return now >= five_minutes_before_expiration


@app.middleware("http")
async def authenticate_middleware(request: Request, call_next):
    """
    Middleware function to check for JWT token
    """
    try:
        if (
            request.url.path == settings.GRAPHQL_PREFIX
            and request.method != "OPTIONS"
            and request.method != "GET"
        ):
            payload = await AuthorizationService.authorize(request)
            if not payload:
                raise HTTPException(
                    status_code=401,
                    detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE,
                )
            if is_token_near_expiration(payload):
                user = payload.get("user")
                if not user:
                    logger.error("User not found")
                    raise HTTPException(
                        status_code=401,
                        detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE,
                    )
                user_document = await UserDocument.find_one(
                    UserDocument.email == user.get("email")
                )

                if not user_document:
                    logger.error("User not found")
                    raise HTTPException(
                        status_code=401,
                        detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE,
                    )
                user_document.ip = (
                    request.client.host if request.client else "not found"
                )
                user_document.last_logged_at = datetime.now(UTC)
                await user_document.save()

                access_token = AuthorizationService.create_jwt(user_document)
                token_payload = {"access_token": access_token, "token_type": "bearer"}
                token_model = TokenModel(**token_payload)
                dispatch(
                    "token-refresh", payload=token_model, middleware_id=event_handler_id
                )
        return await call_next(request)
    except HTTPException as e:
        logger.error("An error occured during request: {0}".format(str(e)))
        return get_graphql_error_response(e.detail, e.status_code)


@app.post("/api/login", response_model=TokenModel)
async def log_in(
    form_data: OAuth2PasswordRequestForm = Depends(), request: Request = None
):
    from app.config.settings import settings

    if not settings.PASSWORD or not settings.ADMIN_EMAIL:
        logger.error(AuthorizationService.INVALID_CREDENTIALS_MESSAGE)
        raise HTTPException(
            status_code=401, detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE
        )
    if (
        settings.ADMIN_PASSWORD != form_data.password
        or settings.ADMIN_EMAIL != form_data.username
    ):
        logger.error(AuthorizationService.INVALID_CREDENTIALS_MESSAGE)
        raise HTTPException(
            status_code=401, detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE
        )
    user = await UserDocument.find_one(UserDocument.email == form_data.username)

    if not user:
        logger.error("User not found")
        raise HTTPException(
            status_code=401, detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE
        )
    user.ip = request.client.host if request.client else "not found"
    user.last_logged_at = datetime.now(UTC)
    await user.save()

    access_token = AuthorizationService.create_jwt(user)

    token_payload = {"access_token": access_token, "token_type": "bearer"}
    return token_payload


# # Install middleware to catch all exceptions
# @app.middleware("http")
# async def exception_handler(request: Request, call_next):
#     try:
#         return await call_next(request)
#     except Exception as e:
#         logger.error("An unexpected error occured during request: {0}".format(str(e)))
#         logger.info(
#             "Traceback is: {0}".format(str(traceback.format_tb(e.__traceback__, 10)))
#         )

#         return JSONResponse(
#             content={
#                 "message": "Unexpected error occured during request processing. \
# Our team has been notified."
#             },
#             status_code=500,
#         )
