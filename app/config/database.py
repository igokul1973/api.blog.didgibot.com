from motor.motor_asyncio import AsyncIOMotorClient

from app.config.settings import settings
from app.PatchedApi import PatchedFastAPI


def connect_db(app: PatchedFastAPI):
    print("Connecting to database...")
    # Set the Stable API version when creating a new client

    print("The connection string:", settings.CONNECTION_STRING)

    try:
        client = AsyncIOMotorClient(
            settings.CONNECTION_STRING,
            connectTimeoutMS=1000,
            socketTimeoutMS=1000,
            serverSelectionTimeoutMS=1000,
        )
        db = client.get_database("didgibot")

        app.mongo_client = client
        app.db = db
    except Exception as e:
        print(e)
