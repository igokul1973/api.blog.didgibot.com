"""App settings."""

from urllib import parse

from environs import Env
from pydantic_settings import BaseSettings

from app.version import __version__

env = Env()


class Settings(BaseSettings):
    """Basic settings for the application."""

    # Application
    TITLE: str = "Blog"
    VERSION: str = __version__
    DESCRIPTION: str = "Personal Blog Graphql API"
    # DEBUG: bool = env.bool("DEBUG", default=False)
    GRAPHQL_PREFIX: str = "/graphql"
    LOGIN_PREFIX: str = "/api/login"
    ADMIN_EMAIL: str = env.str("ADMIN_EMAIL")
    ADMIN_PASSWORD: str = env.str("ADMIN_PASSWORD")

    # Database
    USER: str = env.str("MONGO_INITDB_ROOT_USERNAME", "username")
    PASSWORD: str = parse.quote_plus(env.str("MONGO_INITDB_ROOT_PASSWORD", "password"))
    PORT: int = env.int("MONGO_REPLICA_PORT", 27017)
    HOST: str = env.str("MONGO_REPLICA_HOST", "password")

    CONNECTION_STRING: str = (
        f"mongodb://{USER}:{PASSWORD}@{HOST}:{PORT}/didgibot"
        + "?authSource=admin&replicaSet=rs0&directConnection=true"
    )

    # Token
    SECRET_KEY: str | None = env.str("JWT_SECRET", None)  # in seconds
    TOKEN_LIFE: int = env.int("ACCESS_TOKEN_LIFE", 2400)

    # Fileservice
    UPLOAD_FILE_URL: str = env.str("FILE_SERVICE_URL", "http://localhost:8080/api/file")
    UPLOAD_BUCKET: str = env.str("FILE_SERVICE_BUCKET", "images")


settings = Settings()
