import os
import sys

os.system(
    "strawberry export-schema app.schemas.schema:schema --output app/schema.graphql"
)

sys.exit(0)
