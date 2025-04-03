from typing import Annotated, Any, List, Optional

import strawberry
from pydantic import Field

from app.models.pydantic import (ArticleCreateInputModel, ArticleModel,
                                 ArticleModelPartial, ArticlesFilterInputModel,
                                 ArticleUpdateInputModel,
                                 CategoriesFilterInputModel,
                                 CategoryCreateInputModel, CategoryInputModel,
                                 CategoryModel, CategoryUpdateInputModel,
                                 CountInputModel, CountModel, IdModel,
                                 PyObjectId, SortModel, TagCreateInputModel,
                                 TagInputModel, TagModel, TagsFilterInputModel,
                                 TagUpdateInputModel, TokenModel,
                                 TranslationCreateInputModel, TranslationModel,
                                 TranslationUpdateInputModel, UserModel,
                                 UserModelPartial, UsersFilterInputModel,
                                 UserUpdateFilterInputModel)


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


@strawberry.experimental.pydantic.type(
    model=TokenModel,
    all_fields=True
)
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


@strawberry.experimental.pydantic.type(
    model=TranslationModel,
    fields=["language", "header", "content", "is_published", "published_at"],
)
class TranslationType:
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


@strawberry.experimental.pydantic.input(model=CategoryUpdateInputModel, fields=["id", "name"])
class CategoryUpdateInputType: ...


@strawberry.experimental.pydantic.input(model=TagInputModel, fields=["id", "name"])
class TagInputType: ...


@strawberry.experimental.pydantic.input(model=TagCreateInputModel, fields=["name"])
class TagCreateInputType: ...


@strawberry.experimental.pydantic.input(model=TagUpdateInputModel, fields=["id", "name"])
class TagUpdateInputType: ...


@strawberry.experimental.pydantic.input(model=TranslationCreateInputModel, all_fields=True)
class TranslationCreateInputType: ...


@strawberry.experimental.pydantic.input(model=TranslationUpdateInputModel, all_fields=True)
class TranslationUpdateInputType: ...


@strawberry.experimental.pydantic.input(
    model=ArticleCreateInputModel,
    fields=None,
)
class ArticleCreateInputType:
    translation: TranslationCreateInputType
    category: CategoryInputType
    tags: List[Optional[TagInputType]]
    author: Optional[
        Annotated["UserInputType", strawberry.lazy("app.schemas.typeDefs")]
    ]


@strawberry.experimental.pydantic.input(
    model=ArticleUpdateInputModel,
    fields=["id"],
)
class ArticleUpdateInputType:
    translation: TranslationUpdateInputType
    category: Optional[CategoryInputType]
    tags: Optional[List[Optional[TagInputType]]]


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


@strawberry.experimental.pydantic.input(model=UserUpdateFilterInputModel, all_fields=True)
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
