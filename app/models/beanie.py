from typing import Annotated

from beanie import Document, Indexed
from pydantic import Field
from pymongo import ASCENDING, TEXT, IndexModel

from app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel


class ArticleDocument(Document, ArticleModel):

    class Settings:
        name = "articles"
        indexes = [
            IndexModel(
                [
                    ("translations.header", TEXT),
                    ("translations.tags.name", TEXT),
                    ("translations.category.name", TEXT),
                    ("translations.content.blocks.data.text", TEXT),
                    ("translations.content.blocks.data.content", TEXT),
                    ("translations.content.blocks.data.items.content", TEXT),
                    ("translations.content.blocks.data.items.code", TEXT),
                    ("translations.content.blocks.data.items.cols.text", TEXT),
                    ("translations.content.blocks.data.items.cols.content", TEXT),
                ],
                name="search_article_index",
                weights={
                    "translations.header": 10,
                    "translations.tags.name": 5,
                    "translations.category.name": 5,
                    "translations.content.blocks.data.text": 5,
                    "translations.content.blocks.data.content": 5,
                    "translations.content.blocks.data.items.content": 5,
                    "translations.content.blocks.data.items.code": 5,
                    "translations.content.blocks.data.items.cols.text": 5,
                    "translations.content.blocks.data.items.cols.content": 5,
                },
                default_language="russian",
            )
        ]


class UserDocument(Document, UserModel):
    email: Annotated[str, Indexed(index_type=ASCENDING, unique=True)] = Field(
        ..., min_length=6, max_length=60
    )

    class Settings:
        name = "users"


class CategoryDocument(Document, CategoryModel):
    name: Annotated[str, Indexed(index_type=ASCENDING, unique=True)] = Field(
        ..., min_length=3, max_length=60
    )

    class Settings:
        name = "categories"


class TagDocument(Document, TagModel):
    name: Annotated[str, Indexed(index_type=ASCENDING, unique=True)] = Field(
        ..., min_length=2, max_length=60
    )

    class Settings:
        name = "tags"


models = [ArticleDocument, UserDocument, CategoryDocument, TagDocument]
