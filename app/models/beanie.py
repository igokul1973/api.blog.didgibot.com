from typing import Annotated, Any

from beanie import Document, Indexed
from pydantic import Field
from pymongo import ASCENDING, TEXT, IndexModel

from app.models.pydantic import (ArticleModel, CategoryModel, TagModel,
                                 UserModel)


class ArticleDocument(Document, ArticleModel):

    class Settings:
        name = "articles"
        indexes = [
            IndexModel(
                [
                    ("translations.header", TEXT),
                    ("search_content", TEXT),
                ],
                name="search_article_index",
                weights={
                    "translations.header": 10,
                    "search_content": 5
                },
                default_language="none"
            )
        ]


class UserDocument(Document, UserModel):
    email: Annotated[str, Indexed(index_type=ASCENDING, unique=True)] = \
        Field(..., min_length=6, max_length=60)

    class Settings:
        name = "users"


class CategoryDocument(Document, CategoryModel):
    name: Annotated[str, Indexed(index_type=ASCENDING, unique=True)] = \
        Field(..., min_length=3, max_length=60)

    class Settings:
        name = "categories"


class TagDocument(Document, TagModel):
    name: Annotated[str, Indexed(index_type=ASCENDING, unique=True)] = \
        Field(..., min_length=2, max_length=60)

    class Settings:
        name = "tags"


models = [
    ArticleDocument,
    UserDocument,
    CategoryDocument,
    TagDocument
]
