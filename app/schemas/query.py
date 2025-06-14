from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry

from app.models.pydantic import ArticlesFilterInputModel, CountModel, EntityEnum
from app.models.utils.requests import (
    get_articles,
    get_categories,
    get_count,
    get_tags,
    get_users,
)
from app.schemas.typeDefs import (
    ArticlesFilterInputType,
    ArticleType,
    CategoriesFilterInputType,
    CategoryType,
    CountType,
    SortInputType,
    TagsFilterInputType,
    TagType,
    UsersFilterInputType,
    UserType,
)

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
        user = await info.context.user
        if not filter_input:
            filter_input = ArticlesFilterInputType()
        if not user:
            """
            If user is not logged in, then we return only published articles.
            Otherwise, we return all articles according to the filter.
            """
            article_input_model = filter_input.to_pydantic()
            article_input_model.is_published = True
            article_input_model = ArticlesFilterInputModel.model_validate(
                article_input_model
            )
            filter_input = ArticlesFilterInputType.from_pydantic(article_input_model)
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
