from loguru import logger
from motor.motor_asyncio import AsyncIOMotorClient

from app.config.settings import settings
from app.PatchedApi import PatchedFastAPI


def connect_db(app: PatchedFastAPI):
    print("Connecting to database...")
    # Set the Stable API version when creating a new client

    try:
        client = AsyncIOMotorClient(
            settings.CONNECTION_STRING,
            connectTimeoutMS=2000,
            socketTimeoutMS=2000,
            serverSelectionTimeoutMS=2000,
        )
        logger.info("Successfully connected to DB.")
        db = client.get_database("didgibot")

        app.mongo_client = client
        app.db = db
    except Exception as e:
        logger.error(e)
