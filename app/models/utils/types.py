from typing import TypedDict


class TMongoEntitySanitized(TypedDict):
    id: str


class TMongoEntity(TMongoEntitySanitized, TypedDict):
    _id: str
