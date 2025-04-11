import re
from datetime import datetime
from operator import itemgetter
from typing import TYPE_CHECKING, Annotated, List, Tuple

import strawberry
from beanie import PydanticObjectId, UpdateResponse
from fastapi import HTTPException

from app.models.beanie import (ArticleDocument, CategoryDocument, TagDocument,
                               UserDocument)
from app.models.pydantic import (ArticleModel, CategoryModel, PyObjectId,
                                 TagInputModel, TagModel, TranslationModel,
                                 UserModel)
from app.models.utils.common import transform_entity_to_type
from app.schemas.typeDefs import (ArticleCreateInputType, ArticleType,
                                  ArticleUpdateInputType,
                                  CategoryCreateInputType, CategoryType,
                                  CategoryUpdateInputType, DeleteResultType,
                                  IdInputType, IdType, TagCreateInputType,
                                  TagType, TagUpdateInputType, UserType,
                                  UserUpdateFilterInputType)

if TYPE_CHECKING:
    from app.schemas.schema import Context


def clean_tags(tags: List[TagCreateInputType]):
    return [tag.to_pydantic().model_dump() for tag in tags]


def clean_html_tags(raw_html: str):
    CLEANR = re.compile("<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});")
    no_tags_text = re.sub(CLEANR, "", raw_html)
    clean_text = re.sub(" +", " ", no_tags_text)
    return clean_text


async def get_category(category_data: dict) -> CategoryDocument:
    """
    Gets a category by either id or creates a new one if it doesn't exist.

    Args:
    - category_data (dict): A dictionary containing the category data.
        If id is present, it will be used to retrieve a category,
        otherwise a new category will be created with the given data.

    Returns:
    - CategoryDocument: The category document.
    """

    category_id = category_data.get("id")
    category = None
    if not category_id:
        category_model = CategoryModel(**category_data)
        cat_data = CategoryModel.model_validate(category_model).model_dump()
        category = await CategoryDocument.insert_one(CategoryDocument(**cat_data))
    else:
        category = await CategoryDocument.find_one(CategoryDocument.id == category_id)
    if not category:
        raise ValueError("Category not found")
    return category


async def get_tags(tags: List[TagModel | None] | List[TagInputModel | None]) -> Tuple[
    List[TagDocument],
    List[TagDocument]
]:
    """
    Processes a list of tags, distinguishing between existing and new tags.

    This function iterates over the provided list of tags, determines whether
    each tag is an existing tag or needs to be inserted as a new tag, and
    performs the necessary database operations.

    Args:
    - tags: A list of TagModel or TagInputModel objects (or None). Tags with
      no id are considered new and will be inserted into the database.

    Returns:
    - A tuple containing two lists:
      - The first list contains existing TagDocument objects found in the database.
      - The second list contains newly inserted TagDocument objects.
    """

    tags_to_insert: List[TagDocument] = []
    inserted_tags = []
    existing_tags = []
    for tag in tags:
        if not tag:
            continue
        if isinstance(tag, TagInputModel) and tag.id is None:
            tag_model = TagModel(**tag.model_dump())
            tag_data = TagModel.model_validate(tag_model).model_dump()
            tag_document = TagDocument(**tag_data)
            tags_to_insert.append(tag_document)
        else:
            tag_res = await TagDocument.find_one(TagDocument.id == tag.id)
            if not tag_res:
                raise ValueError("Tag not found")
            existing_tags.append(tag_res)
    if len(tags_to_insert) > 0:
        inserted_tags_res = await TagDocument.insert_many(tags_to_insert)
        inserted_tags = await TagDocument.find(
            {"_id": {"$in": inserted_tags_res.inserted_ids}}
        ).to_list()
    return (existing_tags, inserted_tags)


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def set_article(
        self,
        data: ArticleCreateInputType,
        info: strawberry.Info[
            Annotated["Context", strawberry.lazy("app.schemas.schema")]
        ]
    ) -> ArticleType:
        """
        Create a new article.
        :param data: The article data.
        :return: The created article.
        :raises: Exception if validation error occurs.
        """
        from app.schemas.schema import AuthorizationService

        article_input_model = data.to_pydantic()
        article_input_dict = article_input_model.model_dump()
        article_to_insert = {"translations": [], "search_content": ""}

        # author
        author = await info.context.user
        if not author:
            raise HTTPException(
                status_code=401,
                detail=AuthorizationService.INVALID_CREDENTIALS_MESSAGE
            )

        author_res = await UserDocument.find(
            {"email": author.email}
        ).first_or_none()

        if not author_res:
            user_model = author
            user_data = UserModel.model_validate(user_model).model_dump()
            user_document = UserDocument(**user_data)
            inserted_author_res = await UserDocument.insert_one(user_document)
            if not inserted_author_res:
                raise ValueError("Inserted author not found")
            inserted_author = await UserDocument.find_one(
                UserDocument.id == inserted_author_res.id
            )
        else:
            inserted_author = author_res

        if not inserted_author:
            raise ValueError("Author not found")

        article_to_insert["author"] = inserted_author.model_dump()

        for index, t in enumerate(article_input_dict["translations"]):
            if t["is_published"] is True and not \
                    t["published_at"]:
                t["published_at"] = datetime.now()
            elif t["is_published"] is False:
                t["published_at"] = None

            article_to_insert["translations"].append(t)

            # Category
            input_model_translation = article_input_model.translations[index]
            cat = await get_category(input_model_translation.category.model_dump())
            article_to_insert["translations"][index]["category"] = cat.model_dump()

            # Tags
            tags = input_model_translation.tags
            if len(tags) > 0:
                existing_tags, inserted_tags = await get_tags(tags)
                article_to_insert["translations"][index]["tags"] = \
                    [tag.model_dump() for tag in inserted_tags] + \
                    [tag.model_dump() for tag in existing_tags]

            # Search content
            # Inserting article content only as it will be
            # properly updated in the watch script
            article_to_insert["search_content"] = article_to_insert["translations"][0]["content"]

        article_document = ArticleDocument(**article_to_insert)
        inserted_article = await ArticleDocument.insert_one(article_document)

        if not inserted_article:
            raise ValueError("Article not inserted")

        return transform_entity_to_type(inserted_article.model_dump(), ArticleModel, ArticleType)

    @strawberry.mutation
    async def update_article(self, data: ArticleUpdateInputType) -> ArticleType:
        """
        Create a new article.
        :param data: The article data.
        :return: The created article.
        :raises: Exception if validation error occurs.
        """

        # 1. Get the article input model
        article_input_model = data.to_pydantic()
        article_input_dict = article_input_model.model_dump()
        # 2. Get the current article document with input id
        current_article_document = await ArticleDocument.get(
            PydanticObjectId(article_input_model.id)
        )
        if not current_article_document:
            raise ValueError("Article cannot be updated as it was not found")
        # 3. Make sure each translation is up-to-date
        for i, t in enumerate(current_article_document.translations) :
            # header, content, is_published, published_at
            header, content, is_published = itemgetter(
                "header", "content", "is_published"
            )(article_input_dict["translations"][i])

            if header:
                t.header = header
            if content:
                t.content = content
            if is_published is not None:
                t.is_published = is_published

            if t.is_published and t.published_at is not True:
                t.published_at = \
                    datetime.now()
            elif not t.is_published and t.published_at is not None:
                t.published_at = None

            # 4. Make sure the category is created if it doesn't exist
            category_input_dict = article_input_dict["translations"][i].get("category")
            if category_input_dict:
                cat = await get_category(category_input_dict)
                t.category = CategoryModel(**cat.model_dump())

            # 5
            # 5. Make sure the tags are created if they don't exist
            tags = article_input_model.translations[i].tags
            if tags is not None:
                if len(tags) > 0:
                    existing_tags, inserted_tags = await get_tags(tags)
                    new_tags = [
                        TagModel(
                            **tag.model_dump()
                        ) if tag else None for tag in inserted_tags + existing_tags
                    ]
                    t.tags = new_tags
                else:
                    t.tags = []

        # 6. Update the current article document with above categories and tags
        # and update the updated_at field
        current_article_document.updated_at = datetime.now()

        # 7. Save the updated article document.
        updated_article = await current_article_document.save()

        if not updated_article:
            raise ValueError("Article not updated")

        return transform_entity_to_type(updated_article, ArticleModel, ArticleType)

    @strawberry.mutation
    async def delete_article(self, data: IdInputType) -> DeleteResultType:
        input_dict = data.to_pydantic().model_dump()

        res = await ArticleDocument.find_one(ArticleDocument.id == input_dict["id"]).delete()

        if not res or not res.acknowledged:
            raise ValueError("Article not deleted")

        return DeleteResultType(
            acknowledged=res.acknowledged, deleted_count=res.deleted_count
        )

    @strawberry.mutation
    async def set_category(self, data: CategoryCreateInputType) -> CategoryType:

        category_model = data.to_pydantic()
        category = CategoryDocument(**category_model.model_dump())

        inserted_category = await CategoryDocument.insert_one(category)

        if not inserted_category:
            raise ValueError("Category not inserted")

        category_type = transform_entity_to_type(
            inserted_category.model_dump(), CategoryModel, CategoryType
        )

        return category_type

    @strawberry.mutation
    async def update_user(self, data: UserUpdateFilterInputType) -> UserType:

        user_input_dict = data.to_pydantic().model_dump()
        current_user_document = await UserDocument.get(user_input_dict["id"])

        if not current_user_document:
            raise ValueError("User not found")

        current_user_dict = current_user_document.model_dump()

        # Merge current_user_document with user_input_dict
        new_user_dict = (
            current_user_dict | {k: v for (k, v) in user_input_dict.items() if v is not None}
        )

        new_user_document = UserDocument(**new_user_dict)
        updated_user_document = await new_user_document.save()

        if not updated_user_document:
            raise ValueError("User not updated")

        user_type = transform_entity_to_type(
            updated_user_document.model_dump(), UserModel, UserType
        )

        return user_type

    @strawberry.mutation
    async def update_category(self, data: CategoryUpdateInputType) -> CategoryType:

        category = CategoryDocument(**data.to_pydantic().model_dump())

        updated_category = await CategoryDocument.find_one(
            CategoryDocument.id == category.id
        ).set(
            {
                CategoryDocument.name: category.name,
                CategoryDocument.updated_at: category.updated_at
            },
            response_type=UpdateResponse.NEW_DOCUMENT
        )

        if not updated_category:
            raise ValueError("Category not updated")

        category_type = transform_entity_to_type(updated_category, CategoryModel, CategoryType)

        return category_type

    @strawberry.mutation
    async def delete_category(self, data: IdInputType) -> DeleteResultType:

        input_dict = data.to_pydantic().model_dump()

        # Category cannot be deleted if it is used on any article
        article_documents = await ArticleDocument.find(
            {"translations.category.id": input_dict["id"]}
        ).to_list()

        if len(article_documents) > 0:
            raise ValueError("Category cannot be deleted as it is used on some articles")

        res = await CategoryDocument.find_one(CategoryDocument.id == input_dict["id"]).delete()

        if not res or res.deleted_count == 0:
            raise ValueError("Category not found")

        return DeleteResultType(
            acknowledged=res.acknowledged, deleted_count=res.deleted_count
        )

    @strawberry.mutation
    async def set_tag(self, data: TagCreateInputType) -> TagType:

        tag_model = data.to_pydantic()
        tag = TagDocument(**tag_model.model_dump())

        inserted_tag = await TagDocument.insert_one(tag)

        if not inserted_tag:
            raise ValueError("Tag not inserted")

        tag_type = transform_entity_to_type(inserted_tag, TagModel, TagType)

        return tag_type

    @strawberry.mutation
    async def update_tag(self, data: TagUpdateInputType) -> TagType:

        tag = TagDocument(**data.to_pydantic().model_dump())

        updated_tag = await TagDocument.find_one(
            TagDocument.id == tag.id
        ).set(
            {TagDocument.name: tag.name, TagDocument.updated_at: tag.updated_at},
            response_type=UpdateResponse.NEW_DOCUMENT
        )

        if not updated_tag:
            raise ValueError("Tag not updated")

        tag_type = transform_entity_to_type(updated_tag, TagModel, TagType)

        return tag_type

    @strawberry.mutation
    async def delete_tag(self, data: IdInputType) -> DeleteResultType:

        input_dict = data.to_pydantic().model_dump()

        # Tag cannot be deleted if it is used on any article

        article_documents = await ArticleDocument.find(
            {"translations.tags.id": input_dict["id"]}
        ).to_list()

        if len(article_documents) > 0:
            raise ValueError("Tag cannot be deleted as it is used on some articles")

        res = await TagDocument.find_one(TagDocument.id == input_dict["id"]).delete()

        if not res or res.deleted_count == 0:
            raise ValueError("Tag not found")

        return DeleteResultType(
            acknowledged=res.acknowledged, deleted_count=res.deleted_count
        )

    @strawberry.mutation
    async def add_tag_to_article(
        self, article_id: str, data: TagCreateInputType
    ) -> ArticleType:

        tag_document = TagDocument(**data.to_pydantic().model_dump())
        if tag_document.id is None and tag_document.name is None:
            raise ValueError("Tag id or name is required")
        # We'll be inserting tag first
        if tag_document.id is None:
            inserted_tag = await TagDocument.insert_one(tag_document)

            if not inserted_tag:
                raise ValueError("Tag not inserted")

            tag_document = inserted_tag

        update = {
            "$push": {"translations.$[].tags": tag_document},
            "$set": {"updated_at": datetime.now()},
        }

        updated_article = await ArticleDocument.find_one(
            ArticleDocument.id == PydanticObjectId(article_id)
        ).update(update)

        if not updated_article:
            raise ValueError("Updated article not found")

        new_search_content = get_search_content(updated_article.model_dump())

        update = {
            "$set": {
                "search_content": new_search_content,
                "updated_at": datetime.now(),
            },
        }

        updated_article = await ArticleDocument.find_one(
            ArticleDocument.id == PydanticObjectId(article_id)
        ).update(update)

        if not updated_article:
            raise ValueError("Updated article not found")

        article_type = transform_entity_to_type(
            updated_article, ArticleModel, ArticleType
        )

        return article_type


def get_search_content(article: dict):
    headers: str = ""
    content: str = ""
    categories: str = ""
    tags: str = ""
    for translation in article["translations"]:
        headers += translation["header"]
        content += translation["content"]
        tags += " ".join([tag["name"] for tag in translation["tags"]])
        categories += translation["category"]["name"]

    search_content = headers + " " + content + " " + tags + " " + categories

    search_content = clean_html_tags(search_content)

    return search_content


# type Mutation {
#     loginUser(input: CredentialsInput!): Tokens
#     refreshTokens(refreshToken: String!): Tokens
# }
