from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry

from app.models.pydantic import CountModel, EntityEnum
from app.models.utils.requests import (get_articles, get_categories, get_count,
                                       get_tags, get_users)
from app.schemas.typeDefs import (ArticlesFilterInputType, ArticleType,
                                  CategoriesFilterInputType, CategoryType,
                                  CountType, SortInputType,
                                  TagsFilterInputType, TagType,
                                  UsersFilterInputType, UserType)

if TYPE_CHECKING:
    from app.schemas.schema import Context


@strawberry.type
class Query:

    @strawberry.field
    async def count(
        self,
        entity: EntityEnum = EntityEnum.article,
    ) -> CountType:
        c = await get_count(entity)
        r = CountModel(count=c, entity=entity)
        return CountType.from_pydantic(r)

    @strawberry.field()
    async def articles(
        self,
        info: strawberry.Info[
            Annotated["Context", strawberry.lazy("app.schemas.schema")]
        ],
        filter_input: Optional[ArticlesFilterInputType] = None,
        sort_input: Optional[List[SortInputType]] = None,
        limit: Optional[int] = 10,
        skip: Optional[int] = 0,
    ) -> List[
        Optional[Annotated["ArticleType", strawberry.lazy("app.schemas.typeDefs")]]
    ]:
        if not filter_input:
            filter_input = ArticlesFilterInputType()
        return await get_articles(filter_input, sort_input, limit, skip)

    @strawberry.field
    async def users(
        self,
        info: strawberry.Info[
            Annotated["Context", strawberry.lazy("app.schemas.schema")]
        ],
        filter_input: Optional[UsersFilterInputType] = None,
        sort_input: Optional[List[SortInputType]] = None,
        limit: Optional[int] = 10,
        skip: Optional[int] = 0,
    ) -> List[Optional[UserType]]:
        # check if user is logged in and authorized
        return await get_users(filter_input, sort_input, limit, skip)

    @strawberry.field
    async def categories(
        self,
        filter_input: Optional[CategoriesFilterInputType] = None,
        sort_input: Optional[List[SortInputType]] = None,
        limit: Optional[int] = 10,
        skip: Optional[int] = 0,
    ) -> List[Optional[CategoryType]]:
        return await get_categories(filter_input, sort_input, limit, skip)

    @strawberry.field
    async def tags(
        self,
        filter_input: Optional[TagsFilterInputType] = None,
        sort_input: Optional[List[SortInputType]] = None,
        limit: Optional[int] = 10,
        skip: Optional[int] = 0,
    ) -> List[Optional[TagType]]:
        return await get_tags(filter_input, sort_input, limit, skip)
