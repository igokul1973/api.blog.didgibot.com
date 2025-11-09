import builtins
import re
import unicodedata
from datetime import datetime

from beanie import Document, PydanticObjectId
from fastapi.responses import JSONResponse
from graphql import GraphQLFormattedError
from pydantic.v1.utils import deep_update
from strawberry.experimental.pydantic.conversion_types import (
    PydanticModel,
    StrawberryTypeFromPydantic,
)
from strawberry.http import GraphQLHTTPResponse


def get_graphql_error_response(
    message: str, error_code: str | int | None = None
) -> JSONResponse:
    if not message:
        message = "Error occurred"
    data: GraphQLHTTPResponse = {"data": None}

    e = {
        "message": message,
        "path": [],
        "locations": [],
    }

    if error_code:
        e = deep_update(e, {"extensions": {"error_code": error_code}})

    error = GraphQLFormattedError(**e)

    errors = []
    errors.append(error)

    data["errors"] = errors

    return JSONResponse(content=data)


def transform_object_to_serializable(entity: dict) -> dict:
    if not isinstance(entity, dict):
        return entity
    for key, value in entity.items():
        if isinstance(value, PydanticObjectId):
            entity[key] = str(value)
        elif isinstance(value, datetime):
            entity[key] = str(value)
        elif isinstance(value, list):
            for i, item in enumerate(value):
                value[i] = transform_object_to_serializable(item)
        elif isinstance(value, dict):
            entity[key] = transform_object_to_serializable(value)

    return entity


def transform_id(entity: dict) -> dict:
    """
    Transforms a MongoDB entity by replacing the
    "_id" field with "id" field.

    Args:
        entity (dict): The MongoDB entity
        with _id field to transform.

    Returns:
        dict: An entity with an
        "id" instead of "_id" field .
    """
    if not isinstance(entity, dict) or "_id" not in entity:
        raise ValueError("Entity must be a dictionary and have an '_id' attribute")
    entity["id"] = entity["_id"]
    return {k: v for k, v in entity.items() if k != "_id"}


def _transform_ids_recursive(entity: dict | list) -> dict | list:
    """
    Recursively transforms a nested data structure
    (dict or list) by replacing "_id" with "id" in all
    dictionaries found.

    Attn:
    This function must be used only by "transform_ids" function!

    Args:
        entity (dict | list): The data structure to
            transform.

    Returns:
        dict | list: The transformed data structure.
    """
    if not isinstance(entity, dict):
        return entity
    if "_id" in entity:
        entity = transform_id(entity)
    for key, value in entity.items():
        if isinstance(value, list):
            for i, item in enumerate(value):
                value[i] = _transform_ids_recursive(item)
        if isinstance(value, dict):
            entity[key] = _transform_ids_recursive(value)
    return entity


def transform_ids(entity: dict) -> dict:
    handled_entity = _transform_ids_recursive(entity)
    return handled_entity if isinstance(handled_entity, dict) else {}


def transform_entity_to_type(
    entity: dict | Document,
    model: type[PydanticModel],
    strawberry_type: builtins.type[StrawberryTypeFromPydantic[PydanticModel]],
) -> StrawberryTypeFromPydantic[PydanticModel]:
    if isinstance(entity, Document):
        entity = entity.model_dump()
    entity = transform_ids(entity)
    k = model(**entity)
    return strawberry_type.from_pydantic(k)


def truncate_object(obj, depth):
    """
    Truncates a dictionary or list to a specified depth.

    Args:
        obj (dict or list): The object to truncate.
        depth (int): The maximum depth of the object.

    Returns:
        dict or list: The truncated object.
    """
    if depth == 0:
        if isinstance(obj, dict):
            return {}
        elif isinstance(obj, list):
            return []
        else:
            return obj

    if isinstance(obj, dict):
        return {k: truncate_object(v, depth - 1) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [truncate_object(item, depth - 1) for item in obj]
    else:
        return obj


def now_factory() -> datetime:
    return datetime.now()


def generate_slug(title, suffix: str | None = None) -> str:
    """
    Converts an article title into an SEO-optimized URL slug.

    Args:
        title (str): The article title to convert
    Returns:
        str: SEO-friendly URL slug
    """

    # Convert to lowercase
    slug = title.lower()

    # Remove accents and converts to ASCII
    slug = unicodedata.normalize('NFKD', slug).encode('ascii', 'ignore').decode('ascii')

    # Replace spaces and underscores with hyphens
    slug = re.sub(r'[\s_]+', '-', slug)

    # Remove all non-alphanumeric characters except hyphens
    slug = re.sub(r'[^a-z0-9-]', '', slug)

    # Add suffix if provided
    if suffix:
        slug += '-' + suffix.lower()

    # Remove common stop words (optional but recommended for SEO)
    stop_words = ['a', 'an', 'and', 'at', 'by', 'for', 'in', 'is', 'it', 'on', 'or', 'the', 'to', 'with']
    words = slug.split('-')
    # Keep stop word if it is first
    words = [w for w in words if w not in stop_words or words.index(w) == 0]
    slug = '-'.join(words)

    # Remove consecutive hyphens and trim hyphens from ends:
    # The regular expression '-+' matches one or more consecutive hyphens
    # The strip('-') method removes leading and trailing hyphens
    # The strip() method removes any leading or trailing whitespace
    slug = re.sub(r'-+', '-', slug).strip('-').strip()

    return slug
