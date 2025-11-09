from typing import TypedDict


class TMongoEntitySanitized(TypedDict):
    id: str


class TMongoEntity(TMongoEntitySanitized):
    _id: str
