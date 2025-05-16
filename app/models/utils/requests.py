from typing import Annotated, Any, List, Optional

from beanie import PydanticObjectId
from strawberry import lazy

from app.models.beanie import (
    ArticleDocument,
    CategoryDocument,
    TagDocument,
    UserDocument,
)
from app.models.pydantic import (
    ArticleModel,
    CategoryModel,
    EntityEnum,
    PyObjectId,
    TagModel,
    UserModel,
)
from app.schemas.typeDefs import (
    ArticlesFilterInputType,
    ArticleType,
    CategoriesFilterInputType,
    CategoryType,
    SortInputType,
    TagsFilterInputType,
    TagType,
    UsersFilterInputType,
    UserType,
)


def wrap_search_query(query):
    words = query.split()
    if len(words) > 1:
        return f'"{query}"'
    else:
        return query


def is_cyrillic_word(word: str):
    if word is None or len(word) == 0:
        return False
    for char in word:
        if not "\u0400" <= char <= "\u04ff":
            return False

    return True


async def get_articles(
    filter_input: ArticlesFilterInputType = ArticlesFilterInputType(),
    sort_input: Optional[List[SortInputType]] = None,
    limit: Optional[int] = 10,
    skip: Optional[int] = 0,
) -> List[Optional[Annotated["ArticleType", lazy("app.schemas.typeDefs")]]]:
    """
    Get articles filtered by the given filter and sorted by the given sort.

    :param filter: ArticlesFilterInputType, the filter to apply
    :param sort: Optional[List[SortInputType]], the sort to apply
    :return: List[ArticleType], the list of articles
    """
    from app.models.utils.common import transform_entity_to_type

    is_search = False
    filter_dict = {}
    filter_input_dict = filter_input.to_pydantic().model_dump()
    if filter_input_dict["ids"]:
        id_objects = [PydanticObjectId(id) for id in filter_input_dict["ids"]]
        ids_filter = {"_id": {"$in": id_objects}}
        filter_dict.update(ids_filter)
        filter_input_dict.pop("ids")
    if filter_input_dict["header"]:
        header_filter = {
            "translations.header": {
                "$regex": filter_input_dict["header"],
                "$options": "i",
            }
        }
        filter_dict.update(header_filter)
        filter_input_dict.pop("header")
    if filter_input_dict["content"]:
        content_filter = {
            "translations.content": {
                "$regex": filter_input_dict["content"],
                "$options": "i",
            }
        }
        filter_dict.update(content_filter)
        filter_input_dict.pop("content")

    if filter_input_dict["created_at"]:
        if filter_input_dict["created_at"]["from_"]:
            created_at_filter = {
                "created_at": {"$gte": filter_input_dict["created_at"]["from_"]}
            }
            filter_dict.update(created_at_filter)
        if filter_input_dict["created_at"]["to_"]:
            created_at_filter = {
                "created_at": {"$lte": filter_input_dict["created_at"]["to_"]}
            }
            filter_dict.update(created_at_filter)
        filter_input_dict.pop("created_at")

    if filter_input_dict["updated_at"]:
        if filter_input_dict["updated_at"]["from_"]:
            updated_at_filter = {
                "updated_at": {"$gte": filter_input_dict["updated_at"]["from_"]}
            }
            filter_dict.update(updated_at_filter)
        if filter_input_dict["updated_at"]["to_"]:
            updated_at_filter = {
                "updated_at": {"$lte": filter_input_dict["updated_at"]["to_"]}
            }
            filter_dict.update(updated_at_filter)
        filter_input_dict.pop("updated_at")

    if filter_input_dict["published_at"]:
        if filter_input_dict["published_at"]["from_"]:
            published_at_filter = {
                "published_at": {"$gte": filter_input_dict["published_at"]["from_"]}
            }
            filter_dict.update(published_at_filter)
        if filter_input_dict["published_at"]["to_"]:
            published_at_filter = {
                "published_at": {"$lte": filter_input_dict["published_at"]["to_"]}
            }
            filter_dict.update(published_at_filter)
        filter_input_dict.pop("published_at")

    if "search" in filter_input_dict:
        if filter_input_dict["search"]:
            # This simple trick allows to search more effectively
            # in both Russian and English languages.
            is_ru = is_cyrillic_word(filter_input_dict["search"])
            language = "ru" if is_ru else "en"
            search_filter = {
                "$text": {
                    "$search": wrap_search_query(filter_input_dict["search"]),
                    "$language": language,
                },
            }
            filter_dict.update(search_filter)
            is_search = True
        filter_input_dict.pop("search")
    if filter_input_dict["user_id"]:
        # Filter by author id
        author_filter = {"author.id": PydanticObjectId(filter_input_dict["user_id"])}
        filter_dict.update(author_filter)
        filter_input_dict.pop("user_id")
    filter_dict.update({k: v for k, v in filter_input_dict.items() if v is not None})

    r: dict[str, Any] = {}
    if filter_dict:
        r: dict[str, Any] = {"filter": filter_dict}

    if is_search:
        r["projection"] = {"score": {"$meta": "textScore"}}

    if "filter" in r:
        articles = ArticleDocument.find(r["filter"])
    else:
        articles = ArticleDocument.find_all()

    if limit:
        articles = articles.limit(limit)
    if skip:
        articles = articles.skip(skip)

    sort_list = []
    if is_search:
        sort_list.append(("score", {"$meta": "textScore"}))
    if sort_input:
        for s in sort_input:
            s = s.to_pydantic()
            sort_list.append((s.field, s.dir.value))
    if sort_list:
        articles = articles.sort(sort_list)

    res = []
    async for article in articles:
        article_type = transform_entity_to_type(article, ArticleModel, ArticleType)
        res.append(article_type)

    return res


async def get_user_by_id(
    id: PyObjectId,
) -> Optional[Annotated["UserType", lazy("app.schemas.typeDefs")]]:

    from app.models.utils.common import transform_entity_to_type

    user = await UserDocument.find_one(UserDocument.id == id)

    if not user:
        return None

    transformed_user = transform_entity_to_type(user, UserModel, UserType)
    return transformed_user


async def get_users(
    filter_input: Optional[UsersFilterInputType] = None,
    sort_input: Optional[List[SortInputType]] = None,
    limit: Optional[int] = 10,
    skip: Optional[int] = 0,
) -> List[Optional[Annotated["UserType", lazy("app.schemas.typeDefs")]]]:

    from app.models.utils.common import transform_entity_to_type

    # EXAMPLE of using $lookup aggregation with comments.
    # Hence - not removing.
    #
    # from app.schemas.typeDefs import UserType
    # Join to 'users' collection the 'articles' collection
    # 'localField' is the field in the user collection
    # 'foreignField' is the field in the articles collection
    # '$match' is used to filter the users
    # users = UserDocument.aggregate(
    # [
    # {"$match": {"last_name": "Battson"}},
    # {
    #     "$lookup": {
    #         "from": "articles",
    #         "localField": "articles._id",
    #         "foreignField": "_id",
    #         "as": "articles",
    #     }
    # }
    # ]
    # )
    # I might use the $text search here too
    # but there is no necessity as the email/phone
    # for the user must be typed completely for the
    # sake of authentication. I do not see any other
    # reasons to search for users, so skipping the
    # text search.
    if not filter_input:
        filter_input = UsersFilterInputType()
    filter_dict: dict[str, Any] = {}
    filter_input_dict = filter_input.to_pydantic().model_dump()
    if filter_input_dict["ids"]:
        id_objects = [PydanticObjectId(id) for id in filter_input_dict["ids"]]
        filter_dict = {"_id": {"$in": id_objects}}
        filter_input_dict.pop("ids")
    if filter_input_dict["email"]:
        f = {"email": {"$regex": filter_input_dict["email"], "$options": "i"}}
        filter_dict.update(f)
        filter_input_dict.pop("email")
    if filter_input_dict["phone"]:
        f = {"phone": {"$regex": filter_input_dict["phone"], "$options": "i"}}
        filter_dict.update(f)
        filter_input_dict.pop("phone")

    filter_dict.update({k: v for k, v in filter_input_dict.items() if v is not None})

    users = UserDocument.find(filter_dict)

    if limit:
        users = users.limit(limit)
    if skip:
        users = users.skip(skip)

    sort_list = []
    if sort_input:
        for s in sort_input:
            s = s.to_pydantic()
            sort_list.append((s.field, s.dir.value))
    if sort_list:
        users = users.sort(sort_list)

    res = []

    async for user in users:
        transformed_user = transform_entity_to_type(user, UserModel, UserType)
        res.append(transformed_user)
    return res


async def get_categories(
    filter_input: Optional[CategoriesFilterInputType] = None,
    sort_input: Optional[List[SortInputType]] = None,
    limit: Optional[int] = 10,
    skip: Optional[int] = 0,
) -> List[Optional[Annotated["CategoryType", lazy("app.schemas.typeDefs")]]]:

    from app.models.utils.common import transform_entity_to_type

    # Whereas the autocomplete here (and in get_tags())
    # might be welcome for the sake of searching for the
    # articles by category/tags, standalone version of
    # Mongo DB, unfortunately, does not support partial text
    # searches. The text search here is not necessary as the
    # category name will be typed completely and there will
    # be not that many categories/tags. So skipping indexing
    # as the memory considerations for the current hosting
    # are more important.
    if not filter_input:
        filter_input = CategoriesFilterInputType()
    filter_dict = {}
    filter_input_dict = filter_input.to_pydantic().model_dump()
    if filter_input_dict["ids"]:
        filter_dict = {"_id": {"$in": filter_input_dict["ids"]}}
        filter_input_dict.pop("ids")
    if "name" in filter_input_dict:
        if filter_input_dict["name"]:
            f = {"name": {"$regex": filter_input_dict["name"], "$options": "i"}}
            filter_dict.update(f)
        filter_input_dict.pop("name")
    filter_dict.update({k: v for k, v in filter_input_dict.items() if v is not None})

    categories = CategoryDocument.find(filter_dict)

    if limit:
        categories = categories.limit(limit)
    if skip:
        categories = categories.skip(skip)

    sort_list = []
    if sort_input:
        for s in sort_input:
            s = s.to_pydantic()
            sort_list.append((s.field, s.dir.value))
    if sort_list:
        categories = categories.sort(sort_list)

    res = []

    async for category in categories:
        transformed_category = transform_entity_to_type(
            category, CategoryModel, CategoryType
        )
        res.append(transformed_category)
    return res


async def get_tags(
    filter_input: Optional[TagsFilterInputType] = None,
    sort_input: Optional[List[SortInputType]] = None,
    limit: Optional[int] = 10,
    skip: Optional[int] = 0,
) -> List[Optional[Annotated["TagType", lazy("app.schemas.typeDefs")]]]:

    from app.models.utils.common import transform_entity_to_type

    if not filter_input:
        filter_input = TagsFilterInputType()

    filter_dict = {}
    filter_input_dict = filter_input.to_pydantic().model_dump()
    if filter_input_dict["ids"]:
        id_objects = [PydanticObjectId(id) for id in filter_input_dict["ids"]]
        filter_dict = {"_id": {"$in": id_objects}}
        filter_input_dict.pop("ids")
    if "name" in filter_input_dict:
        if filter_input_dict["name"]:
            f = {"name": {"$regex": filter_input_dict["name"], "$options": "i"}}
            filter_dict.update(f)
        filter_input_dict.pop("name")
    filter_dict.update({k: v for k, v in filter_input_dict.items() if v is not None})

    tags = TagDocument.find(filter_dict)

    if limit:
        tags = tags.limit(limit)
    if skip:
        tags = tags.skip(skip)

    sort_list = []
    if sort_input:
        for s in sort_input:
            s = s.to_pydantic()
            sort_list.append((s.field, s.dir.value))
    if sort_list:
        tags = tags.sort(sort_list)

    res = []
    async for tag in tags:
        transformed_tag = transform_entity_to_type(tag, TagModel, TagType)
        res.append(transformed_tag)
    return res


async def get_count(entity: EntityEnum = EntityEnum.article) -> int:
    if entity == EntityEnum.article:
        return await ArticleDocument.count()
    if entity == EntityEnum.user:
        return await UserDocument.count()
    if entity == EntityEnum.category:
        return await CategoryDocument.count()
    if entity == EntityEnum.tag:
        return await TagDocument.count()
    raise ValueError(f"Unknown entity: {entity}")
