import re
from datetime import datetime
from typing import TYPE_CHECKING, Annotated, List, Tuple

import strawberry
from beanie import UpdateResponse
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
    # category
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
        article_to_insert["translations"].append(article_input_dict["translation"])

        # Category
        cat = await get_category(article_input_model.category.model_dump())
        article_to_insert["translations"][0]["category"] = cat.model_dump()

        # Tags
        tags = article_input_model.tags
        if len(tags) > 0:
            existing_tags, inserted_tags = await get_tags(tags)
            article_to_insert["translations"][0]["tags"] = \
                [tag.model_dump() for tag in inserted_tags] + existing_tags

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
        # try:
        article_input_model = data.to_pydantic()
        article_input = article_input_model.model_dump()

        current_article = await ArticleDocument.get(
            PyObjectId(article_input["id"])
        )
        if not current_article:
            raise ValueError("Article cannot be updated as it was not found")

        current_article.updated_at = datetime.now()

        article_to_update = current_article.model_dump()

        article_to_update["updated_at"] = datetime.now()

        # find the translation index that needs to be updated
        current_updated_translation_index = [
            i for i, translation in enumerate(article_to_update["translations"])
            if translation['language'] == article_input["translation"]["language"]
        ][0]
        article_to_update["translations"][current_updated_translation_index] = \
            article_to_update["translations"][current_updated_translation_index] \
            | article_input["translation"]
        current_article.translations[current_updated_translation_index] = \
            TranslationModel(**(
                current_article.translations[current_updated_translation_index].model_dump()
                | {k: v for (k, v) in article_input["translation"].items() if v is not None}
            ))
        if article_input["translation"]["is_published"] is True:
            current_article.translations[current_updated_translation_index].published_at = \
                datetime.now()
        elif article_input["translation"]["is_published"] is False:
            current_article.translations[current_updated_translation_index].published_at = None

        # category
        category_input_data = article_input_model.category.model_dump() \
            if article_input_model.category else None
        if category_input_data:
            cat = await get_category(category_input_data)
            article_to_update["translations"][current_updated_translation_index]["category"] \
                = cat.model_dump()
            current_article.translations[current_updated_translation_index].category = cat

        # tags
        tags = article_input_model.tags
        if tags and len(tags) > 0:
            existing_tags, inserted_tags = await get_tags(tags)
            article_to_update["translations"][current_updated_translation_index]["tags"] =  \
                [tag.model_dump() for tag in inserted_tags] + existing_tags
            new_tags = [
                TagModel(
                    **tag.model_dump()
                ) if tag else None for tag in inserted_tags + existing_tags
            ]
            current_article.translations[current_updated_translation_index].tags = \
                new_tags

        updated_article = await current_article.save()

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
            ArticleDocument.id == PyObjectId(article_id)
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
            ArticleDocument.id == PyObjectId(article_id)
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
