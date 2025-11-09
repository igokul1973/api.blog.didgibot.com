from motor.motor_asyncio import AsyncIOMotorDatabase
from app.migrations.core import Migration
from app.models.utils.common import generate_slug
from app.models.pydantic import ObjectId
from typing import Dict

class Migration001(Migration):

    def __init__(self):
        super().__init__(
            version=1, 
            description='Add new article fields - `slug` and `priority`'
        )
    
    def get_title(self, article):
        for t in article.get("translations", []):
            if t.get("language") == "en":
                return t.get("header", None)

    async def upgrade(self, db: AsyncIOMotorDatabase):
        # Only update documents missing the fields `slug` and `priority`

        # First get all articles that have no `slug`
        no_slug_articles = await db["articles"].find({ "slug": { "$exists": False } }).to_list(length=None) 
        titles = [(a.get("_id"), self.get_title(a)) for a in no_slug_articles]
        # create empty typed set that accepts only strings
        titles_count: Dict[str, int] = dict()

        for t in titles:
            id = t[0]
            title = t[1]
            if title is not None:
                if title in titles_count:
                    titles_count[title] += 1
                    slug = generate_slug(title, suffix=str(titles_count[title]))
                else:
                    titles_count[title] = 1
                    slug = generate_slug(title, suffix=None )
            
                res1 = await db["articles"].update_one(
                    { "_id": ObjectId(id) },
                    { "$set": { "slug": slug, "priority": 0.8 } }
                )

                res2 = await db["users"].update_one(
                    {"articles": {"$elemMatch": {"id": ObjectId(id)}}},
                    {"$set": {
                        "articles.$.priority": 0.8,
                        "articles.$.slug": slug 
                    }}
                )

    async def downgrade(self, db: AsyncIOMotorDatabase):
        await db["articles"].update_many(
            {},
            { "$unset": { "slug": 1, "priority": 1 } }
        )
        await db["users"].update_many(
            {},
            { "$unset": { "articles.$[].slug": 1, "articles.$[].priority": 1 } }
        )