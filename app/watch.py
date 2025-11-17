import os
import sys
from asyncio import gather, sleep
from contextlib import asynccontextmanager
from datetime import datetime
from fastapi.responses import JSONResponse

import pymongo
import pymongo.errors
from beanie import UpdateResponse, init_beanie
from loguru import logger
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo.errors import OperationFailure

from app.ChangeStreamOperationTypeEnum import ChangeStreamOperationType
from app.config.database import connect_db
from app.config.settings import settings
from app.main import PatchedFastAPI
from app.models.beanie import (
    ArticleDocument,
    CategoryDocument,
    TagDocument,
    UserDocument,
    models,
)
from app.models.pydantic import ArticleModelPartial

environment = os.getenv("ENVIRONMENT")

if environment == "production":
    sys.tracebacklimit = 0


async def handle_article_insert(inserted_document: dict):
    """
    This function updates search content in 'articles' table
    """
    failure_message = "User document update failed after an Article insert"
    try:
        inserted_article = inserted_document["fullDocument"]
        article_author_id = inserted_article["author"]["id"]
        author_document = await UserDocument.find_one(
            UserDocument.id == article_author_id
        )
        if not author_document:
            return logger.error(failure_message)
        article_model = ArticleModelPartial(
            **inserted_article, id=inserted_article["_id"]
        )
        author_document.articles.append(article_model)
        author_document.updated_at = datetime.now()
        updated_user_document = await author_document.save()

        if not updated_user_document:
            return logger.error(failure_message)

        logger.info(
            "Successfully updated User with a new Article after an Article insert"
        )
    except Exception as e:
        logger.error(e)


async def handle_article_update(updated_document: dict):
    """
    This function updates 'users' table, but only in case the
    article itself changed, not its updated_at field and the author
    of the article. Else - we fall into a circular dependency.
    """
    updated_fields = updated_document["updateDescription"]["updatedFields"]
    try:
        if "author" in updated_fields and len(updated_fields) == 1:
            return logger.info(
                "Only an author of the article was updated. "
                "It means the user associated with the author "
                "already has the same changes. Nothing to do..."
            )
        else:
            # Update user document with updated article
            updated_article_document = await ArticleDocument.get(
                updated_document["documentKey"]["_id"]
            )
            if not updated_article_document:
                logger.warning("User document update failed after an Article update.")
                return logger.warning(
                    f"Updated article with id \
                    {updated_document["documentKey"]["_id"]} was not found"
                )

            updated_article = updated_article_document.model_dump()
            author = {"id": updated_article["author"]["id"]}
            updated_article["author"] = author

            user_to_update = await UserDocument.find_one(
                UserDocument.id == author["id"]
            )
            if not user_to_update:
                logger.warning("User document update failed after an Article update.")
                return logger.warning(
                    f"User with id \
                    {author["id"]} was not found"
                )
            user_to_update_model = user_to_update.model_dump()

            if updated_article["id"] in [
                article["id"] for article in user_to_update_model["articles"]
            ]:
                """
                Update article in 'users' table
                """
                updated_user = await user_to_update.update(
                    {
                        "$set": {
                            "articles.$[article]": updated_article,
                            "updated_at": datetime.now(),
                        }
                    },
                    array_filters=[{"article.id": updated_article["id"]}],
                )
            else:
                """
                Add article to 'users' table
                """
                updated_user = await user_to_update.update(
                    {
                        "$push": {"articles": updated_article},
                        "$set": {"updated_at": datetime.now()},
                    }
                )

            if not updated_user:
                return logger.warning(
                    "User document update failed after an Article update"
                )
            logger.info("Successfully updated User document after an Article update")
    except Exception as e:
        logger.error(e)


async def handle_article_delete(updated_document: dict):
    """
    This function updates 'users' table.
    It deletes an article from the list of articles of the author.
    """
    try:
        deleted_article_id = updated_document["documentKey"]["_id"]
        updated_user = await UserDocument.find_one(
            UserDocument.articles.id == deleted_article_id,
        )
        updated_user = UserDocument.find_one(
            UserDocument.articles.id == deleted_article_id
        )
        updated_user = await updated_user.update(
            {
                "$pull": {"articles": {"id": deleted_article_id}},
                "$set": {"updated_at": datetime.now()},
            },
            response_type=UpdateResponse.NEW_DOCUMENT,
        )
        if not updated_user:
            return logger.warning("User document update failed after an Article delete")
        logger.info("Successfully updated User document after an Article delete.")
    except Exception as e:
        logger.error(e)


async def handle_user_update(updated_document: dict):
    try:
        updated_user_id = updated_document["documentKey"]["_id"]
        updated_user = await UserDocument.find_one(UserDocument.id == updated_user_id)
        if not updated_user:
            return logger.warning("Articles update failed after user update")
        author = updated_user.model_dump()
        articles = [{"id": article["id"]} for article in author["articles"]]
        author["articles"] = articles
        # Embed article ids into all embedded authors inside articles
        # It may sound redundant, but for the sake of symmetry
        # I'll do it. This way we can get via one article all articles
        # written by the same author, and via one author all his or her
        # articles.

        # article.
        set_query = {"$set": {"author": author}}
        updated_articles = await ArticleDocument.find(
            ArticleDocument.author.id == updated_user_id
        ).update_many(set_query)
        if not updated_articles or not updated_articles.acknowledged:
            return logger.warning("Articles update failed after a User update")
        logger.info("Successfully updated Articles after a User update.")
    except Exception as e:
        logger.error(e)


async def handle_category_update(updated_document: dict):
    """
    This function updates articles table
    with updated category.
    """
    try:
        updated_category_id = updated_document["documentKey"]["_id"]
        updated_category = await CategoryDocument.find_one(
            CategoryDocument.id == updated_category_id
        )
        if not updated_category:
            return logger.warning("Articles update failed after Category update")
        category = updated_category.model_dump()
        set_query = {
            "$set": {
                "translations.$[].category": category,
                "updated_at": datetime.now(),
            }
        }
        updated_articles = await ArticleDocument.find(
            {"translations.category.id": category.get("id", None)},
        ).update_many(set_query)

        if not updated_articles or not updated_articles.acknowledged:
            return logger.warning(
                "Articles update failed after Category update. \
            The category either has no articles, or something went wrong."
            )
        logger.info("Successfully updated Articles after a Category update.")
    except Exception as e:
        logger.error(e)


async def handle_tag_update(updated_document: dict):
    """
    This function updates articles table
    with updated tag.
    """
    try:
        updated_tag_id = updated_document["documentKey"]["_id"]
        updated_tag = await TagDocument.find_one(TagDocument.id == updated_tag_id)
        if not updated_tag:
            return logger.warning("Articles update failed after Tag update")
        tag = updated_tag.model_dump()
        set_query = {
            "$set": {
                "translations.$[].tags.$[filter]": tag,
                "updated_at": datetime.now(),
            }
        }
        array_filters = [{"filter.id": tag["id"]}]
        updated_articles = await ArticleDocument.find(
            {"translations.tags.id": tag.get("id", None)},
        ).update_many(set_query, array_filters=array_filters)
        if not updated_articles or not updated_articles.acknowledged:
            return logger.warning(
                "Articles update failed after Tag update. \
                The tag either has no articles, or something went wrong."
            )
        logger.info("Successfully updated Articles after a Tag update.")
    except Exception as e:
        logger.error(e)


async def handle_operation(
    collection_name: str, operation: ChangeStreamOperationType, change_stream: dict
):
    """
    A function handling ChangeStream events' operations.
    It handles additional DB operations after a user made
    changes to the database.
    It is part of the mechanism that unblocks and accelerates
    the main request-response cycle by responding to the user
    right after the initial DB operation is made and triggers
    this function to make additional DB operations related to
    the original one.
    It can be extended to handle other events.
    """

    def get_message(collection_name, action: str):
        return f"Document for collection {collection_name.upper()} {action}. Handling it..."

    if collection_name == "articles":
        if operation == ChangeStreamOperationType.INSERT:
            logger.info(get_message(collection_name, "inserted"))
            await handle_article_insert(change_stream)
        if operation == ChangeStreamOperationType.UPDATE:
            logger.info(get_message(collection_name, "updated"))
            await handle_article_update(change_stream)
        if operation == ChangeStreamOperationType.DELETE:
            logger.info(get_message(collection_name, "updated"))
            await handle_article_delete(change_stream)
    elif collection_name == "users":
        if operation == ChangeStreamOperationType.UPDATE:
            logger.info(get_message(collection_name, "updated"))
            await handle_user_update(change_stream)
    elif collection_name == "categories":
        if operation == ChangeStreamOperationType.UPDATE:
            logger.info(get_message(collection_name, "updated"))
            await handle_category_update(change_stream)
    elif collection_name == "tags":
        if operation == ChangeStreamOperationType.UPDATE:
            logger.info(get_message(collection_name, "updated"))
            await handle_tag_update(change_stream)
    elif operation == ChangeStreamOperationType.DELETE:
        logger.info(get_message(collection_name, "deleted"))
    else:
        logger.info("Not supported operation. Not handling...")


async def watch_collection(
    collection: AsyncIOMotorCollection, operation_type: ChangeStreamOperationType
):
    resume_token = None
    pipeline = [{"$match": {"operationType": operation_type.value}}]
    try:
        async with collection.watch(pipeline) as stream:
            async for change_stream in stream:
                logger.info(change_stream)
                resume_token = stream.resume_token

                await handle_operation(collection.name, operation_type, change_stream)
    # except pymongo.errors.PyMongoError:
    except pymongo.errors.PyMongoError as e:
        # The ChangeStream encountered an unrecoverable error or the
        # resume attempt failed to recreate the cursor.
        logger.warning(e)
        if resume_token is None:
            message = "A failure during ChangeStream initialization."
            logger.error(message)
        else:
            # Use the interrupted ChangeStream's resume token to create
            # a new ChangeStream. The new stream will continue from the
            # last seen insert change without missing any events.

            async with collection.watch(pipeline, resume_after=resume_token) as stream:
                async for change_stream in stream:
                    logger.info(change_stream)
                    await handle_operation(
                        collection.name, operation_type, change_stream
                    )


def receive_signal(signal_number, frame):
    print("Received:", signal_number)
    sys.exit()


@asynccontextmanager
async def lifespan(app: PatchedFastAPI):
    import signal

    # need it to cancel app using Ctrl+C
    # else it just hangs
    signal.signal(signal.SIGINT, receive_signal)
    # Connect DB
    connect_db(app)

    try:
        print("Now trying to initialize the beanie!")
        await init_beanie(
            database=app.db,
            document_models=models,
            allow_index_dropping=True,
        )
    except OperationFailure:
        sleep_time = 3
        logger.warning(
            "It seems the Beanie could not initialize due to DB connection failure."
        )
        logger.warning(f"Sleeping for {sleep_time} seconds and trying again...")
        await sleep(sleep_time)
        logger.warning("Trying again...")
        try:
            await init_beanie(database=app.db, document_models=models)
        except Exception as e:
            logger.error(e)

    article_collection = ArticleDocument.get_motor_collection()
    user_collection = UserDocument.get_motor_collection()
    category_collection = CategoryDocument.get_motor_collection()
    tag_collection = TagDocument.get_motor_collection()

    try:
        article_insert_watch = watch_collection(
            article_collection, ChangeStreamOperationType.INSERT
        )
        article_update_watch = watch_collection(
            article_collection, ChangeStreamOperationType.UPDATE
        )
        article_delete_watch = watch_collection(
            article_collection, ChangeStreamOperationType.DELETE
        )

        user_insert_watch = watch_collection(
            user_collection, ChangeStreamOperationType.INSERT
        )
        user_update_watch = watch_collection(
            user_collection, ChangeStreamOperationType.UPDATE
        )
        user_delete_watch = watch_collection(
            user_collection, ChangeStreamOperationType.DELETE
        )

        category_insert_watch = watch_collection(
            category_collection, ChangeStreamOperationType.INSERT
        )
        category_update_watch = watch_collection(
            category_collection, ChangeStreamOperationType.UPDATE
        )
        category_delete_watch = watch_collection(
            category_collection, ChangeStreamOperationType.DELETE
        )

        tag_insert_watch = watch_collection(
            tag_collection, ChangeStreamOperationType.INSERT
        )
        tag_update_watch = watch_collection(
            tag_collection, ChangeStreamOperationType.UPDATE
        )
        tag_delete_watch = watch_collection(
            tag_collection, ChangeStreamOperationType.DELETE
        )

        await gather(
            article_insert_watch,
            article_update_watch,
            article_delete_watch,
            user_insert_watch,
            user_update_watch,
            user_delete_watch,
            category_insert_watch,
            category_update_watch,
            category_delete_watch,
            tag_insert_watch,
            tag_update_watch,
            tag_delete_watch,
        )
    except Exception as e:
        logger.error("Could not initialize ChangeStream:", e)

    yield
    app.mongo_client.close()


def create_application() -> PatchedFastAPI:
    """Create the FastAPI application.

    Returns:
        FastAPI: created app.
    """
    logger.info("Creating app...")
    app = PatchedFastAPI(
        title=settings.TITLE,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
        docs_url="/api/docs",
        lifespan=lifespan,
    )

    return app


app = create_application()


@app.get("/health")
async def health_check():
    """K8S readiness/liveness probe"""
    return JSONResponse(
        content={"status": "ok"},
        status_code=200,
    )
