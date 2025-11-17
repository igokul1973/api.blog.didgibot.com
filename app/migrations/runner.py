import asyncio
import sys
from loguru import logger
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.migrations.versions import ALL_MIGRATIONS
from app.migrations.core import Migration, MigrationRecord
from app.config.settings import settings


class MigrationRunner:
    def __init__(self, mongodb_url: str):
        self.mongodb_url = mongodb_url
        self.client = None
        self.db = None

    async def connect(self):
        logger.info("About to connect to DB...")
        self.client = AsyncIOMotorClient(
            self.mongodb_url,
            connectTimeoutMS=2000,
            socketTimeoutMS=2000,
            serverSelectionTimeoutMS=2000,
        )
        logger.info("Successfully connected to DB.")
        self.db = self.client.get_database("didgibot")

        logger.info("Got the DB! About to initialize beanie...")

        # Initialize Beanie with MigrationRecord model
        await init_beanie(
            database=self.db,
            document_models=[MigrationRecord],
            allow_index_dropping=False,
        )
        logger.info("Initialized the beanie...")

    async def get_applied_migrations(self):
        """Get a list of already applied migrations"""
        records = await MigrationRecord.find(MigrationRecord.success is True).to_list()

        return {r.version for r in records}

    async def run_migration(self, migration: Migration, is_rollBack=False) -> bool:
        """Run a single migration and record it as applied"""
        action = "Rolling back" if is_rollBack else "Running"
        print(f"\n{'=' * 60}")
        print(f"{action} migration: {migration.version}")
        print(f"Description: {migration.description}")
        print(f"\n{'=' * 60}")

        try:
            if self.db is None:
                raise Exception("No database connection found")
            if is_rollBack:
                await migration.downgrade(self.db)
                await MigrationRecord.find_one({"version": migration.version}).delete()
                print(f"✓ Migration {migration.version} deleted from database\n")
            else:
                await migration.upgrade(self.db)
                record = MigrationRecord(version=migration.version, success=True)
                await record.save()
            print(f"✓ Migration {migration.version} succeeded\n")
            return True
        except Exception as e:
            print(f"✗ Migration {migration.version} failed: {e}\n")
            record = MigrationRecord(
                version=migration.version, success=False, error_message=str(e)
            )
            await record.save()
            return False

    async def run_pending_migrations(self) -> tuple[int, int]:
        """Run all pending migrations. Returns (successful, failed) counts tuple."""
        logger.info("Running pending migrations...")
        applied = await self.get_applied_migrations()
        logger.info("Got applied migrations.")
        logger.info(f"Found {len(applied)} applied migration(s).")
        logger.info("Now will try to get pending migrations...")
        pending = [m for m in ALL_MIGRATIONS if m.version not in applied]
        logger.info("Got pending migrations.")

        if not pending:
            print("No pending migrations found.")
            return (0, 0)

        print(f"\nFound {len(pending)} pending migration(s).")

        successful = 0
        failed = 0

        for migration in pending:
            logger.info("Now will run each migration...")
            success = await self.run_migration(migration)
            if success:
                successful += 1
            else:
                failed += 1
                print(f"✗ Stopping due to failed migration: {migration.version}")
                break

        logger.info("Finished running migrations")

        return (successful, failed)

    async def close(self):
        if self.client:
            self.client.close


async def main(is_rollback=False):
    """Main entry point for migration runner"""
    runner = MigrationRunner(settings.CONNECTION_STRING)

    try:
        logger.info("Connecting to database...")
        await runner.connect()
        logger.info("✓ Connected to database.")

        if is_rollback:
            await runner.run_migration(ALL_MIGRATIONS[-1], True)
        else:
            successful, failed = await runner.run_pending_migrations()
            logger.info(f"✓ successful: {successful}, failed: {failed}.")

            print(f"\n{'=' * 60}")
            logger.info("Migration summary:")
            logger.info(f"   Successful: {successful}")
            logger.error(f"   Failed: {failed}")
            logger.error(f"   Failed: {failed}")
            print(f"\n{'=' * 60}")

            if failed > 0:
                sys.exit(1)  # Exit with error code

    except Exception as e:
        logger.exception(f"✗✗✗ Failed to run migrations: {e.with_traceback(None)}")
        sys.exit(1)
    finally:
        await runner.close()


if __name__ == "__main__":
    asyncio.run(main())
