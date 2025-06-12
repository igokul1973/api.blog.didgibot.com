import os
import sys
import traceback
from asyncio import sleep
from contextlib import asynccontextmanager
from datetime import UTC, datetime, timedelta

import httpx
from beanie import init_beanie
from fastapi import Depends, HTTPException, Request, UploadFile
from fastapi.responses import JSONResponse
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

if environment == "production":
    sys.tracebacklimit = 0

# The subprocess is used to run the watcher in a separate process
# to avoid blocking the main process and to watch DB events
# p = subprocess.run(["python", "-m", "app.watch"], stdout=sys.stdout, stderr=sys.stderr)


@asynccontextmanager
async def lifespan(app: PatchedFastAPI):
    connect_db(app)
    try:
        logger.info("Now trying to initialize the beanie!")
        await init_beanie(
            database=app.db,
            document_models=models,
            allow_index_dropping=True,
        )
    except OperationFailure:
        sleep_time = 3
        logger.warning(
            "It seems the Beanie could not initialize due to DB connection failure."
        )
        logger.warning(f"Sleeping for {sleep_time} seconds and trying again...")
        await sleep(sleep_time)
        logger.warning("Trying again...")
        try:
            # await init_beanie(database=app.db, document_models=models)
            await init_beanie(
                connection_string=settings.CONNECTION_STRING, document_models=models
            )
        except Exception as e:
            logger.warning("Still could not initialize Beanie... Retrying...")
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
    td = timedelta(seconds=1200)
    twenty_minutes_before_expiration_time = expiration_time - td
    return now >= twenty_minutes_before_expiration_time


@app.middleware("http")
async def authenticate_middleware(request: Request, call_next):
    """
    Middleware function to check for JWT token
    """
    try:
        # TODO: Questionable authorization logic
        # Redo when possible.
        if (
            request.url.path != settings.LOGIN_PREFIX
            and request.method != "OPTIONS"
            and request.method != "GET"
        ):
            payload = await AuthorizationService.authorize(request)
            if payload == "free_ride":
                return await call_next(request)
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
        logger.error("An error occurred during request: {0}".format(str(e)))
        if request.url.path == settings.GRAPHQL_PREFIX:
            return get_graphql_error_response(e.detail, e.status_code)
        else:
            return JSONResponse(
                content={"message": e.detail},
                status_code=e.status_code,
            )
    except Exception as e:
        logger.error("An unexpected error occured during request: {0}".format(str(e)))
        logger.info(
            "Traceback is: {0}".format(str(traceback.format_tb(e.__traceback__, 10)))
        )
        return JSONResponse(
            content={
                "message": "Unexpected error occured during request processing. \
                Our team has been notified."
            },
            status_code=500,
        )


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


@app.post("/api/uploadFile")
async def upload_file(image: UploadFile):
    from app.config.settings import settings

    try:
        async with httpx.AsyncClient() as client:
            # post to client the image as a formdata
            files = {"image": image.file.read()}
            form_data = {
                "bucket": settings.UPLOAD_BUCKET,
                "accountId": "dgb-blog",
                "entityId": "article",
                "filename": image.filename,
            }

            response = await client.post(
                settings.UPLOAD_FILE_URL, data=form_data, files=files
            )
            response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes

        # return JSON response containing settings
        return JSONResponse(content=response.json(), status_code=200)

    except httpx.ConnectError as e:
        logger.error(f"Connection error: {e}")
        return JSONResponse(
            content={"error": "Failed to connect to the server"},
            status_code=500,
        )

    except httpx.TimeoutException as e:
        logger.error(f"Timeout error: {e}")
        return JSONResponse(content={"error": "Request timed out"}, status_code=500)

    except httpx.HTTPError as e:
        logger.error(f"HTTP error: {e}")
        return JSONResponse(content={"error": "Failed to upload file"}, status_code=400)

    except Exception as e:
        logger.error(f"Unknown error: {e}")
        return JSONResponse(
            content={"error": "An unknown error occurred"},
            status_code=500,
        )


# @app.post("/api/fetchUrl", response_model=TokenModel)
# async def fetchUrl(
#     form_data: OAuth2PasswordRequestForm = Depends(), request: Request = None
# ):
#     from app.config.settings import settings

#     # return JSON response containing settings
#     return JSONResponse(content={"cra": "tra"}, status_code=200)


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
