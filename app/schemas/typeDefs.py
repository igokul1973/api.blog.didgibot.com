from datetime import datetime
from typing import Annotated, List, Optional, Union

import strawberry
from strawberry.scalars import JSON

from app.models.pydantic import (
    ArticleCreateInputModel,
    ArticleModel,
    ArticleModelPartial,
    ArticlesFilterInputModel,
    ArticleUpdateInputModel,
    CategoriesFilterInputModel,
    CategoryCreateInputModel,
    CategoryInputModel,
    CategoryModel,
    CategoryUpdateInputModel,
    ContentBlockModel,
    ContentModel,
    CountInputModel,
    CountModel,
    IdModel,
    PyObjectId,
    SortModel,
    TagCreateInputModel,
    TagInputModel,
    TagModel,
    TagsFilterInputModel,
    TagUpdateInputModel,
    TokenModel,
    TranslationCreateInputModel,
    TranslationModel,
    TranslationUpdateInputModel,
    UserModel,
    UserModelPartial,
    UsersFilterInputModel,
    UserUpdateFilterInputModel,
)
from app.models.utils.common import now_factory


class DateTime:
    """
    This class is used to convert the pendulum.DateTime type to a string
    and back to a pendulum.DateTime type
    """

    @staticmethod
    def serialize(dt: datetime) -> str:
        return dt.isoformat(timespec="milliseconds")

    @staticmethod
    def parse_value(value: str) -> datetime:
        return datetime.fromisoformat(value)


EpochDateTime = strawberry.scalar(
    datetime,
    name="EpochDateTime",
    description="A date and time",
    serialize=DateTime.serialize,
    parse_value=DateTime.parse_value,
)

# This is needed because GraphQL does not support 64 bit integers
BigInt = strawberry.scalar(
    # NewType("BigInt", Union[int, str]),
    Union[int, str],  # type: ignore
    serialize=lambda v: int(v),
    parse_value=lambda v: str(v),
    description="Timestamp and BigInt field",
)


@strawberry.type
class CreatedUpdatedAtType:
    created_at: datetime = strawberry.field(default_factory=now_factory)  # type: ignore
    updated_at: datetime = strawberry.field(default_factory=now_factory)  # type: ignore


@strawberry.input
class CredentialsInput:
    email: str
    password: str


@strawberry.type
class IdType:
    id: PyObjectId


@strawberry.experimental.pydantic.type(model=CountModel, all_fields=True)
class CountType: ...


@strawberry.type
class DeleteResultType:
    acknowledged: bool = strawberry.field(default=False)
    deleted_count: int = strawberry.field(default=0)


@strawberry.experimental.pydantic.type(model=TokenModel, all_fields=True)
class TokenType: ...


@strawberry.experimental.pydantic.type(
    model=UserModel,
    fields=[
        "id",
        "email",
        "phone",
        "first_name",
        "last_name",
        "ip",
        "last_logged_at",
        "created_at",
        "updated_at",
    ],
)
class UserTypePartial:
    articles: List[Optional[IdType]]


@strawberry.experimental.pydantic.type(
    model=UserModel,
    fields=[
        "id",
        "email",
        "phone",
        "first_name",
        "last_name",
        "ip",
        "last_logged_at",
        "created_at",
        "updated_at",
    ],
)
class UserType:
    articles: List[
        Optional[
            Annotated["ArticleTypePartial", strawberry.lazy("app.schemas.typeDefs")]
        ]
    ]


@strawberry.experimental.pydantic.type(model=CategoryModel, all_fields=True)
class CategoryType: ...


@strawberry.experimental.pydantic.type(model=TagModel, all_fields=True)
class TagType: ...


# @strawberry.experimental.pydantic.type(model=ContentBlockInputModel, all_fields=True)
@strawberry.experimental.pydantic.type(model=ContentBlockModel, fields=["id", "type"])
class ContentBlockType:
    data: JSON


@strawberry.experimental.pydantic.input(model=ContentBlockModel, fields=["id", "type"])
class ContentBlockInput:
    data: JSON


@strawberry.experimental.pydantic.type(model=ContentModel, fields=["version"])
class ContentType:
    time: Optional[BigInt] = strawberry.field(default=None)  # type: ignore
    blocks: List[Optional[ContentBlockType]]


@strawberry.experimental.pydantic.type(
    model=TranslationModel,
    fields=["language", "header", "is_published", "published_at"],
)
class TranslationType:
    content: ContentType
    category: CategoryType
    tags: List[Optional[TagType]]


@strawberry.experimental.pydantic.type(
    model=ArticleModelPartial,
    fields=[
        "id",
        "created_at",
        "updated_at",
    ],
)
class ArticleTypePartial:
    translations: List[TranslationType]
    author: IdType


@strawberry.experimental.pydantic.type(
    model=ArticleModel,
    fields=[
        "id",
        "created_at",
        "updated_at",
    ],
)
class ArticleType:
    translations: List[TranslationType]
    author: UserTypePartial


# Inputs
@strawberry.experimental.pydantic.input(model=IdModel, all_fields=True)
class IdInputType: ...


@strawberry.experimental.pydantic.input(model=CategoryInputModel, fields=["id", "name"])
class CategoryInputType: ...


@strawberry.experimental.pydantic.input(model=CategoryCreateInputModel, fields=["name"])
class CategoryCreateInputType: ...


@strawberry.experimental.pydantic.input(
    model=CategoryUpdateInputModel, fields=["id", "name"]
)
class CategoryUpdateInputType: ...


@strawberry.experimental.pydantic.input(model=TagInputModel, fields=["id", "name"])
class TagInputType: ...


@strawberry.experimental.pydantic.input(model=TagCreateInputModel, fields=["name"])
class TagCreateInputType: ...


@strawberry.experimental.pydantic.input(
    model=TagUpdateInputModel, fields=["id", "name"]
)
class TagUpdateInputType: ...


@strawberry.experimental.pydantic.input(model=ContentModel, fields=["version"])
class ContentInputType:
    time: Optional[BigInt]  # type: ignore
    blocks: List[Optional[ContentBlockInput]]


@strawberry.experimental.pydantic.input(
    model=TranslationCreateInputModel,
    fields=["language", "header", "is_published", "published_at"],
)
class TranslationCreateInputType:
    content: ContentInputType
    category: CategoryInputType
    tags: List[Optional[TagInputType]]


@strawberry.experimental.pydantic.input(
    model=TranslationUpdateInputModel,
    fields=["language", "header", "is_published", "published_at"],
)
class TranslationUpdateInputType:
    content: Optional[ContentInputType]
    category: Optional[CategoryInputType]
    tags: Optional[List[Optional[TagInputType]]]


@strawberry.experimental.pydantic.input(
    model=ArticleCreateInputModel,
    fields=None,
)
class ArticleCreateInputType:
    translations: List[TranslationCreateInputType]
    author: Optional[
        Annotated["UserInputType", strawberry.lazy("app.schemas.typeDefs")]
    ]


@strawberry.experimental.pydantic.input(
    model=ArticleUpdateInputModel,
    fields=["id"],
)
class ArticleUpdateInputType:
    translations: List[TranslationUpdateInputType]


@strawberry.experimental.pydantic.input(
    model=UserModelPartial,
    fields=[
        "id",
        "email",
    ],
)
class UserInputType: ...


@strawberry.experimental.pydantic.input(model=ArticlesFilterInputModel, all_fields=True)
class ArticlesFilterInputType: ...


@strawberry.experimental.pydantic.input(model=UsersFilterInputModel, all_fields=True)
class UsersFilterInputType: ...


@strawberry.experimental.pydantic.input(
    model=UserUpdateFilterInputModel, all_fields=True
)
class UserUpdateFilterInputType: ...


@strawberry.experimental.pydantic.input(
    model=CategoriesFilterInputModel, all_fields=True
)
class CategoriesFilterInputType: ...


@strawberry.experimental.pydantic.input(model=TagsFilterInputModel, all_fields=True)
class TagsFilterInputType: ...


@strawberry.experimental.pydantic.input(model=SortModel, all_fields=True)
class SortInputType: ...


@strawberry.experimental.pydantic.input(model=CountInputModel, all_fields=True)
class CountInput: ...
