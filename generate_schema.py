import os
import sys

from dotenv import load_dotenv

load_dotenv()

os.system(
    "strawberry export-schema app.schemas.schema:schema --output app/schema.graphql"
)

sys.exit(0)
