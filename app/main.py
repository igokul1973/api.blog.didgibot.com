import os
import sys
from asyncio import sleep
from contextlib import asynccontextmanager
from datetime import UTC, datetime

from beanie import init_beanie
from fastapi import Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from graphql import GraphQLError, GraphQLFormattedError
from loguru import logger
from pymongo.errors import OperationFailure
from strawberry.types import ExecutionResult

from app.config.database import connect_db
from app.config.settings import settings
from app.models.beanie import UserDocument, models
from app.models.pydantic import TokenModel
from app.models.utils.common import get_graphql_error_response
from app.models.utils.errors import GeneralException
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
    await connect_db(app)
    try:
        await init_beanie(
            database=app.db,
            document_models=models
        )
    except OperationFailure:
        sleep_time = 3
        logger.warning("It seems the Beanie could not initialize due to DB connection failure.")
        logger.warning(f"Sleeping for {sleep_time} seconds and trying again...")
        await sleep(sleep_time)
        logger.warning("Trying again...")
        try:
            await init_beanie(
                database=app.db,
                document_models=models
            )
        except Exception as e:
            logger.error(e)
    yield
    app.mongo_client.close()


def create_application() -> PatchedFastAPI:
    """Create the FastAPI application.

    Returns:
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


@app.middleware("http")
async def authenticate_middleware(request: Request, call_next):
    '''
    Middleware function to check for JWT token
    '''
    try:
        if request.url.path == settings.GRAPHQL_PREFIX and \
                request.method != "OPTIONS" and \
                request.method != "GET":
            await AuthorizationService.authorize(request)
        return await call_next(request)
    except HTTPException as e:
        logger.error("An error occured during request: {0}".format(str(e)))
        return get_graphql_error_response(e.detail, e.status_code)


@app.post("/api/login", response_model=TokenModel)
async def log_in(form_data: OAuth2PasswordRequestForm = Depends(), request: Request = None):
    from app.config.settings import settings

    if not settings.PASSWORD or not settings.ADMIN_EMAIL:
        logger.error(AuthorizationService.INVALID_CREDENTIALS_MESSAGE)
        raise HTTPException(
            status_code=401, detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE
        )
    if settings.ADMIN_PASSWORD != form_data.password or settings.ADMIN_EMAIL != form_data.username:
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
    return {"access_token": access_token, "token_type": "bearer"}

# Middleware function to check for JWT token
# async def authenticate_request(request: Request):
#     if not PASSWORD or not ADMIN_EMAIL or not SECRET_KEY or not TOKEN_LIFE:
#         raise HTTPException(status_code=401, detail="Invalid system configuration")
#     if request.url.path == GRAPHQL_PREFIX:
#         graphql_query = await request.json()
#         if graphql_query["operationName"] in PROTECTED_ENDPOINTS:
#             try:
#                 token = request.headers["Authorization"].split(" ")[1]
#                 payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITM])
#                 return payload
#             except (KeyError, JWTError):
#                 raise HTTPException(
#                     status_code=401, detail="Invalid or missing JWT token"
#                 )
#     else:
#         return None


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
#                 "message": "Unexpected error occured during request processing. Our team has been notified."
#             },
#             status_code=500,
#         )


# @app.exception_handler(GeneralException)
# async def validation_exception_handler(request: Request, exc: Exception):
#     # Change here to Logger
#     return JSONResponse(
#         status_code=500,
#         content={
#             "message": (
#                 f"Failed method {request.method} at URL {request.url}."
#                 f" Exception message is {exc!r}."
#             )
#         },
#     )
