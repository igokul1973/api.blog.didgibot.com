from datetime import datetime
from enum import Enum
from typing import Annotated, List, Optional

import pymongo
from beanie import PydanticObjectId
from bson import ObjectId
from pydantic import (
    AfterValidator,
    BaseModel,
    BeforeValidator,
    ConfigDict,
    EmailStr,
    Field,
    SerializeAsAny,
)

from app.models.utils.common import now_factory


def check_object_id(value: str) -> PydanticObjectId:
    if not ObjectId.is_valid(value):
        raise ValueError("Invalid ObjectId")
    return PydanticObjectId(value)


PyObjectId = SerializeAsAny[
    Annotated[str, BeforeValidator(str), AfterValidator(check_object_id)]
]


class LanguageEnum(str, Enum):
    ru = "ru"
    en = "en"


class EntityEnum(str, Enum):
    article = "article"
    user = "user"
    category = "category"
    tag = "tag"


class SortDirEnum(Enum):
    asc = pymongo.ASCENDING
    desc = pymongo.DESCENDING


class CreatedUpdatedAtModel:
    """
    Created and updated at mixin that automatically
    updates updated_at field.
    """

    created_at: datetime = Field(..., default_factory=now_factory)  # type: ignore
    updated_at: datetime = Field(..., default_factory=now_factory)  # type: ignore

    model_config = ConfigDict(
        validate_assignment=True,
    )

    # @model_validator(mode="after")
    # @classmethod
    # def update_updated_at(cls, obj: "CreatedUpdatedAtModel") -> "CreatedUpdatedAtModel":
    # """Update updated_at field."""
    # must disable validation to avoid infinite loop
    # obj.model_config["validate_assignment"] = False

    # update updated_at field
    # obj.updated_at = now_factory()

    # enable validation again
    # obj.model_config["validate_assignment"] = True
    # return obj


class IdModel(BaseModel):
    id: PyObjectId


class OptionalIdModel(BaseModel):
    id: Optional[PyObjectId] = Field(default=None)


class BaseUserModel(CreatedUpdatedAtModel, OptionalIdModel):
    email: EmailStr = Field(..., min_length=6, max_length=60)
    # User's phone number. Should be unique
    phone: str = Field(..., min_length=7, max_length=60)
    # User's first and last name
    first_name: str = Field(..., min_length=3, max_length=40)
    last_name: str = Field(..., min_length=3, max_length=40)
    # User's IP address
    ip: str
    # User last log-in date
    last_logged_at: Optional[datetime]


class UserModelPartial(BaseUserModel):
    # Has articles relationship
    articles: List[Optional[IdModel]] = Field(default=[])


class TokenModel(BaseModel):
    access_token: str
    token_type: str


class CategoryModel(CreatedUpdatedAtModel, OptionalIdModel, BaseModel):
    name: str = Field(..., min_length=3, max_length=40)


class CategoryInputModel(OptionalIdModel):
    name: Optional[str] = Field(min_length=3, max_length=40, default=None)


class CategoryCreateInputModel(BaseModel):
    name: str = Field(min_length=3, max_length=40)


class CategoryUpdateInputModel(IdModel):
    name: str = Field(min_length=3, max_length=40)


class TagModel(CreatedUpdatedAtModel, OptionalIdModel):
    name: str = Field(..., min_length=3, max_length=40)


class TagInputModel(OptionalIdModel):
    name: Optional[str] = Field(min_length=3, max_length=40, default=None)


class TagCreateInputModel(BaseModel):
    name: str = Field(min_length=3, max_length=40)


class TagUpdateInputModel(IdModel):
    name: str = Field(min_length=3, max_length=40)


class ContentBlockModel(BaseModel):
    id: str = Field(...)
    type: str = Field(...)
    data: dict


class ContentModel(BaseModel):
    version: Optional[str] = Field(default=None)
    time: Optional[int] = Field(default=None)
    blocks: List[Optional[ContentBlockModel]] = Field(...)


class BaseContentModelOptional(BaseModel):
    content: Optional[ContentModel] = Field(default=None)


class BaseContentModel(BaseModel):
    content: ContentModel = Field(...)


class BaseTranslationCreateInputModel(BaseContentModel):
    language: LanguageEnum = Field(..., min_length=2, max_length=40)
    header: str = Field(..., min_length=3, max_length=80)
    is_published: bool
    published_at: Optional[datetime] = Field(default=None)


class TranslationCreateInputModel(BaseTranslationCreateInputModel):
    category: CategoryInputModel
    tags: List[Optional[TagInputModel]] = Field(default=[])


class TranslationUpdateInputModel(BaseContentModel):
    language: LanguageEnum = Field(..., min_length=2, max_length=40)
    header: Optional[str] = Field(min_length=3, max_length=80, default=None)
    is_published: Optional[bool]
    published_at: Optional[datetime] = Field(default=None)
    category: Optional[CategoryInputModel] = Field(default=None)
    tags: List[Optional[TagInputModel]] = Field(default=[])


class TranslationModel(BaseTranslationCreateInputModel):
    category: CategoryModel
    tags: List[Optional[TagModel]] = Field(default=[])

class BaseSlugModel:
    slug: str = Field(..., min_length=3, max_length=60) 
    # slug: Optional[str] = Field(default='') 
    priority: Optional[float] = Field(default=None)


class BaseArticleModel(OptionalIdModel, CreatedUpdatedAtModel, BaseSlugModel):
    translations: List[TranslationModel] = Field(default=[])


class ArticleModelPartial(BaseArticleModel):
    author: IdModel


class UserModel(BaseUserModel):
    # Has articles relationship
    articles: List[ArticleModelPartial] = Field(default=[])


class ArticleModel(BaseArticleModel):
    author: UserModelPartial


class ArticleCreateInputModel(BaseModel):
    translations: List[TranslationCreateInputModel]
    author: Optional[UserModelPartial] = Field(default=None)
    slug: Optional[str] = Field(default=None) 
    priority: Optional[float] = Field(default=None)


class ArticleUpdateInputModel(IdModel):
    translations: List[TranslationUpdateInputModel]
    slug: Optional[str] = Field(default=None) 
    priority: Optional[float] = Field(default=None)


class TokensModel(BaseModel):
    accessToken: str
    refreshToken: str


class SortModel(BaseModel):
    field: str
    dir: SortDirEnum


class BaseDateRangeModel(BaseModel):
    to_: Optional[datetime] = Field(default=None)
    from_: Optional[datetime] = Field(default=None)


class BaseFilterModel(BaseModel):
    created_at: Optional[BaseDateRangeModel] = Field(default=None)
    updated_at: Optional[BaseDateRangeModel] = Field(default=None)


class ArticlesFilterInputModel(BaseFilterModel, BaseContentModelOptional):
    ids: Optional[List[PyObjectId]] = Field(default=None)
    search: Optional[str] = Field(default=None)
    header: Optional[str] = Field(default=None)
    language: Optional[LanguageEnum] = Field(default=None)
    is_published: Optional[bool] = Field(default=None)
    published_at: Optional[BaseDateRangeModel] = Field(default=None)
    user_id: Optional[PyObjectId] = Field(default=None)
    slug: Optional[str] = Field(default=None)
    priority: Optional[float] = Field(default=None)


class UsersFilterInputModel(BaseFilterModel):
    ids: Optional[List[PyObjectId]] = Field(default=None)
    email: Optional[EmailStr] = Field(default=None)
    phone: Optional[str] = Field(default=None)
    ip: Optional[str] = Field(default=None)
    last_logged_at: Optional[datetime] = Field(default=None)


class UserUpdateFilterInputModel(IdModel):
    email: Optional[EmailStr] = Field(min_length=6, max_length=60, default=None)
    # User's phone number. Should be unique
    phone: Optional[str] = Field(min_length=7, max_length=60, default=None)
    # User's first and last name
    first_name: Optional[str] = Field(min_length=3, max_length=40, default=None)
    last_name: Optional[str] = Field(min_length=3, max_length=40, default=None)


class CategoriesFilterInputModel(BaseFilterModel):
    ids: Optional[List[PyObjectId]] = Field(default=None)
    name: Optional[str] = Field(default=None)


class TagsFilterInputModel(BaseFilterModel):
    ids: Optional[List[PyObjectId]] = Field(default=None)
    name: Optional[str] = Field(default=None)


class CountInputModel(BaseModel):
    entity: EntityEnum


class CountModel(BaseModel):
    count: int
    entity: EntityEnum

class SitemapModel(BaseModel):
    title: str
    slug: str
    priority: float
    language: LanguageEnum
    publishedAt: datetime
    updatedAt: datetime

class SitemapResponseModel(BaseModel):
    data: List[SitemapModel]