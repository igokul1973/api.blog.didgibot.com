from typing import Annotated, Optional
from pymongo import ASCENDING
from beanie import Document, Indexed
from pydantic import Field
from app.models.utils.common import now_factory
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase


class MigrationRecord(Document):
    """ Tracks executed migrations """
    version: Annotated[int, Indexed(index_type=ASCENDING, unique=True)] = Field(...)  # e.g. "001_add_new_fields"
    applied_at: datetime = Field(default_factory=now_factory)
    success: bool = True
    error_message: Optional[str] = None

    class Settings:
        name = "schema_migrations"
        indexes = ["version"]

class Migration:
    """ Base class for migrations """

    def __init__(self, version: int, description: str) -> None:
        self.version = version
        self.description = description

    async def upgrade(self, db: AsyncIOMotorDatabase):
        raise NotImplementedError

    async def downgrade(self, db: AsyncIOMotorDatabase):
        """ Optional rollback logic """
        pass
