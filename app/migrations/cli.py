import sys
import re
import asyncio
from pathlib import Path

# Load .env files before importing anything that uses settings
# flake8: noqa: E402
from dotenv import load_dotenv

load_dotenv()

from app.config.settings import settings
from app.migrations.runner import MigrationRunner
from app.migrations.versions import ALL_MIGRATIONS


async def list_migrations():
    """List migrations and their status"""
    runner = MigrationRunner(settings.CONNECTION_STRING)
    await runner.connect()

    applied = await runner.get_applied_migrations()

    print("\nApplied migrations:")
    print(f"{'Status':<10} {'Version':<30} {'Description'}")
    print("-" * 60)

    for migration in ALL_MIGRATIONS:
        status = "✓ Applied" if migration.version in applied else "○ Pending"
        print(f"{status:<10} {migration.version:<30} {migration.description}")

    await runner.close()


async def create_migration(name: str):
    """
    Generate a new migration file and add new migration
    to ALL_MIGRATIONS list in __init__.py.
    """
    # Get next version number
    last_version = ALL_MIGRATIONS[-1].version if ALL_MIGRATIONS else 0
    next_version = f"{last_version + 1:03d}"

    class_name = f"Migration{next_version}"
    module_name = f"migration_{next_version}_{name}"

    script_dir = Path(__file__).parent
    versions_dir = script_dir / "versions"
    # Ensure directory exists
    versions_dir.mkdir(parents=True, exist_ok=True)

    filename = versions_dir / f"{module_name}.py"

    # Create migration file
    template = f'''from motor.motor_asyncio import AsyncIOMotorDatabase
from app.migrations.core import Migration

class {class_name}(Migration):
    """ Base class for migrations """

    def __init__(self) -> None:
        super().__init__(
            version={last_version + 1},
            description="TODO: Add migration description"
        )

    async def upgrade(self, db: AsyncIOMotorDatabase):
        # TODO: Implement upgrade logic
        raise NotImplementedError

    async def downgrade(self, db: AsyncIOMotorDatabase):
        """ Optional rollback logic """
        pass
'''
    with open(filename, "w") as f:
        f.write(template)

    print(f"✓ Created migration file: {filename}")

    # Update __init__.py
    init_file = versions_dir / "__init__.py"

    new_import = f"from .{module_name} import {class_name}"

    if init_file.exists():
        content = init_file.read_text()

        # Add import statement
        # Find the last import line
        import_pattern = r"(from \.migration_\d+_\w+ import Migration\d+)"
        imports = re.findall(import_pattern, content)

        if imports:
            # Add after the last import
            last_import = imports[-1]
            content = content.replace(last_import, f"{last_import}\n{new_import}")
        else:
            # no existing imports, add at the top
            content = f"{new_import}\n{content}"

        # Add new migration to ALL_MIGRATIONS list
        # Find the ALL_MIGRATIONS list and add the new migration
        list_pattern = r"(ALL_MIGRATIONS\s*=\s*\[)(.*?)(\])"
        match = re.search(list_pattern, content, re.DOTALL)

        if match:
            migration_list = match.group(2)
            # Removing the last \n
            migration_list = migration_list.rstrip()
            # Now add a comma after the last migration
            if not match.group(2).endswith(","):
                migration_list = migration_list + ","

            # Add new migration to the list
            new_entry = f"    {class_name}()"
            migration_list = migration_list + f"\n{new_entry}\n"

            content = content.replace(match.group(2), migration_list)

        init_file.write_text(content)
        print(f"✓ Updated {init_file}")
    else:
        # Create __init__.py from scratch
        init_content = f"""{new_import}

# Order matters! Migrations run in this sequence
ALL_MIGRATIONS = [
    {class_name}(),
]
"""

        init_file.write_text(init_content)
        print(f"✓ Created {init_file}")

    print(f"\n✓ Migration {next_version}_{name} ready!")
    print(f"  Don't forget to implement the upgrade() method in {filename}")


if __name__ == "__main__":
    command = sys.argv[1] if len(sys.argv) > 1 else "run"

    if command == "list":
        asyncio.run(list_migrations())
    elif command == "create":
        if len(sys.argv) < 3:
            print("Usage: python -m migrations.cli create <migration_name>")
            sys.exit(1)
        name = sys.argv[2]
        asyncio.run(create_migration(name))
    elif command == "run":
        from app.migrations.runner import main

        asyncio.run(main(False))
    elif command == "rollback":
        from app.migrations.runner import main

        asyncio.run(main(True))
    else:
        print(f"Unknown command: {command}")
        print("Usage: python -m migrations.cli [list|create <name>|run]")
        sys.exit(1)
    sys.exit(0)
