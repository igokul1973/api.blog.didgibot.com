from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase


class PatchedFastAPI(FastAPI):
    mongo_client: AsyncIOMotorClient
    db: AsyncIOMotorDatabase
