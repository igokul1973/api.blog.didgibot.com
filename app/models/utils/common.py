import builtins
from datetime import datetime
from typing import Any

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


def transform_ids_recursive(entity: dict) -> dict:
    if "_id" in entity:
        entity = transform_id(entity)
    for key, value in entity.items():
        if isinstance(value, list):
            for i, item in enumerate(value):
                value[i] = transform_ids_recursive(item)
        if isinstance(value, dict):
            entity[key] = transform_ids_recursive(value)

    return entity


def transform_entity_to_type(
    entity: dict | Document,
    model: type[PydanticModel],
    strawberry_type: builtins.type[StrawberryTypeFromPydantic[PydanticModel]],
) -> StrawberryTypeFromPydantic[PydanticModel]:
    if isinstance(entity, Document):
        entity = entity.model_dump()
    entity = transform_ids_recursive(entity)
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
