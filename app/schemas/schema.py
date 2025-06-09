import sys
from datetime import UTC, datetime, timedelta
from functools import cached_property
from typing import List, Optional

from environs import Env
from fastapi import HTTPException, WebSocket
from graphql import GraphQLFormattedError
from jose import JWTError, jwt
from loguru import logger
from pydantic import ValidationError
from pymongo.errors import DuplicateKeyError
from starlette.requests import Request
from strawberry import Schema
from strawberry.fastapi import BaseContext, GraphQLRouter
from strawberry.http import GraphQLHTTPResponse
from strawberry.schema.config import StrawberryConfig
from strawberry.subscriptions import GRAPHQL_TRANSPORT_WS_PROTOCOL, GRAPHQL_WS_PROTOCOL
from strawberry.types import ExecutionResult

from app.config.settings import Settings, settings
from app.models.beanie import UserDocument
from app.models.pydantic import UserModel
from app.models.utils.common import transform_object_to_serializable
from app.models.utils.errors import ConfigException
from app.models.utils.requests import get_users
from app.schemas.mutations import Mutation
from app.schemas.query import Query
from app.schemas.subscriptions import Subscription
from app.schemas.typeDefs import EpochDateTime, UsersFilterInputType

env = Env()

logger.remove()
logger.add(
    sys.stdout,
    colorize=True,
    format="<green>{time}</green> <level>{message}</level>",
    backtrace=False,
    diagnose=False,
)


class AuthorizationService:
    PROTECTED_ENDPOINTS: List[str] = [
        "/api/uploadFile",
        "/api/fetchUrl",
        "users",
        "get_users",
        "set_user",
        "update_user",
        "delete_user",
        "set_article",
        "update_article",
        "delete_article",
        "add_tag_to_article",
        "set_category",
        "update_category",
        "delete_category",
        "set_tag",
        "update_tag",
        "delete_tag",
    ]
    ALGORITM: str = "HS256"
    INVALID_TOKEN_MESSAGE = "Invalid or missing JWT token."
    INVALID_TOKEN_CONFIG_MESSAGE = (
        "Invalid or missing secret key or token life configuration."
    )
    INVALID_CREDENTIALS_MESSAGE = "Invalid username or password."

    @classmethod
    def get_token_payload(cls, bearer_token: str, settings: Settings = settings):
        if not settings.SECRET_KEY or not settings.TOKEN_LIFE:
            raise ConfigException(cls.INVALID_CREDENTIALS_MESSAGE)
        token = bearer_token.split(" ")
        # check if token has element number 1
        if len(token) < 2:
            raise ConfigException(cls.INVALID_TOKEN_MESSAGE)
        return jwt.decode(token[1], settings.SECRET_KEY, algorithms=[cls.ALGORITM])

    @classmethod
    async def authorize(cls, request: Request):
        """
        This method checks if the request is a protected endpoint
        or if the token exists. If it does, then return the payload.
        The logic behind it:
            # If protected endpoint is hit - make sure the token
            # exists and is valid.
            # Else - check if token exists and is valid anyway.
            # If token does not exist and it is not a protected
            # endpoint, then we probably deal with public
            # frontend requests.
            # This covers protected frontends (e.g. admin panels)
            # as well as the public ones.
        """
        # TODO: Make sure only allowed hosts can make requests.
        # This'll probably be done in the middleware or on the
        # web server level.
        try:
            operation_name = request.url.path
            if operation_name.startswith(settings.GRAPHQL_PREFIX):
                graphql_query = await request.json()
                operation_name = graphql_query["operationName"].lower()
            if (
                operation_name in cls.PROTECTED_ENDPOINTS
                or "Authorization" in request.headers
            ):

                token = request.headers["Authorization"]
                return cls.get_token_payload(token)
            else:
                return "free_ride"
        except ConfigException as e:
            raise HTTPException(status_code=401, detail=str(e))
        except (KeyError, JWTError):
            raise HTTPException(status_code=401, detail=cls.INVALID_TOKEN_MESSAGE)

    @classmethod
    def create_jwt(cls, user: UserDocument):
        if not settings.SECRET_KEY or not settings.TOKEN_LIFE:
            raise HTTPException(status_code=401, detail=cls.INVALID_CREDENTIALS_MESSAGE)

        access_token_expires = datetime.now(UTC) + timedelta(
            seconds=settings.TOKEN_LIFE
        )

        u = user.model_dump()
        u = transform_object_to_serializable(u)
        del u["articles"]

        access_token = jwt.encode(
            {
                "sub": user.email,
                "exp": access_token_expires,
                "user": u,
            },
            settings.SECRET_KEY,
            algorithm=cls.ALGORITM,
        )
        return access_token


# 1. When request arrives, make sure if it is a protected endpoint
# then check if the token exists and is valid and return the user.
# 2. If it is not a protected endpoint, then make sure that if it
# has a token - it is valid.
class Context(BaseContext):
    @cached_property
    async def token(self) -> Optional[str]:
        if not self.request:
            return None
        assert type(self.request) is Request

        token = None
        if "Authorization" in self.request.headers:
            token = self.request.headers["Authorization"]
        elif "authorization" in self.request.headers:
            token = self.request.headers["authorization"]
        return token

    @cached_property
    async def user(self) -> Optional[UserModel]:
        if not self.request or type(self.request) is WebSocket:
            return None

        assert type(self.request) is Request
        try:
            payload = await AuthorizationService.authorize(self.request)
            # get user from database
            if not payload or payload == "free_ride":
                return None
            users = await get_users(
                filter_input=UsersFilterInputType(email=payload.get("sub")), limit=1
            )
            if not users or not users[0]:
                raise HTTPException(
                    status_code=401,
                    detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE,
                )

            return users[0].to_pydantic()
        except HTTPException as e:
            logger.error("An error occured during user request: {0}".format(e.detail))
            return None


def get_context() -> Context:
    return Context()


class MyGraphQLRouter(GraphQLRouter):
    async def process_result(
        self, request: Request, result: ExecutionResult
    ) -> GraphQLHTTPResponse:
        data: GraphQLHTTPResponse = {"data": result.data}

        errors = []
        if result.errors:
            for err in result.errors:
                k = err.formatted.copy()
                logger.error(err.original_error)
                if isinstance(err.original_error, DuplicateKeyError):
                    k["message"] = "You're trying to insert a duplicate record"
                elif isinstance(err.original_error, ValidationError):
                    k["message"] = "The request is not valid"
                elif isinstance(err.original_error, HTTPException):
                    k["message"] = "Unauthorized user"
                elif isinstance(err.original_error, ValueError):
                    k["message"] = err.message
                elif isinstance(err.original_error, Exception):
                    k["message"] = "Error occurred"

                new_err = GraphQLFormattedError(**k)
                errors.append(new_err)
            data["errors"] = errors
        if result.extensions:
            data["extensions"] = result.extensions

        return data


schema = Schema(
    query=Query,
    mutation=Mutation,
    subscription=Subscription,
    config=StrawberryConfig(auto_camel_case=False),
    scalar_overrides={datetime: EpochDateTime},
)

graphql_router = MyGraphQLRouter(
    schema,
    context_getter=get_context,
    graphql_ide="apollo-sandbox",
    subscription_protocols=[
        GRAPHQL_TRANSPORT_WS_PROTOCOL,
        GRAPHQL_WS_PROTOCOL,
    ],
)
