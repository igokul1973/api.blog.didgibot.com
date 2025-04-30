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
            connectTimeoutMS=2000,
            socketTimeoutMS=2000,
            serverSelectionTimeoutMS=2000,
        )
        print("Success!")
        db = client.get_database("didgibot")
        print("Success again!")

        app.mongo_client = client
        app.db = db
        print("Assigned to app mongo_client and db variables...")
    except Exception as e:
        print("In the exception!")
        print(e)
