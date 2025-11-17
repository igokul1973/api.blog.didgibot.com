// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("didgibot");

// Find a document in a collection.
// db.getCollection("users").aggregate([
//     {"$match": {"_id": ObjectId("683b500788640377526d34e6")}},
//     {"$unwind": "$articles"},
//     {"$match": {"articles.priority": {"$exists": false}}},
//     {
//         "$project": {
//             "_id": 0,
//             "articles.id": 1,
//             "articles.priority": 1,
//             "articles.translations.header": 1,
//             "articles.created_at": 1,
//             "articles.updated_at": 1
//         }
//     }
// ]);

// db.users.aggregate([
//     { $match: { _id: ObjectId("683b500788640377526d34e6") } },
//     { $unwind: "$articles" },
//     { $match: { "articles.priority": { $exists: false } } },
//     { $project: { _id: 1, "articles.id": 1, "articles.priority": 1 } }
// ]).toArray();

// db.users.aggregate([
//     { $unwind: "$articles" },
//     { $match: { "articles.priority": { $exists: false } } },
//     { $project: { _id: 1, "articles.id": 1, "articles.priority": 1, "articles.slug": 1, "articles.created_at": 1 } }
// ]).toArray();

db.articles.aggregate([
    { $match: { "priority": { $exists: true } } },
    { $project: { _id: 1, "priority": 1, "slug": 1, "created_at": 1 } }
]).toArray();



// Get collection "users" schema showing all fields
// db.getCollection("users").getIndexes();
// db.users.find({}, { project: { _id: 0 } });
db.articles.find({ slug: { $exists: false } }, { translations: 0 });

// Give me the count of all articles
// db.getCollection("articles").find({slug: null}).count();

// find all collections
db.users.find({}, { 'articles.translations': 0 });

db.schema_migrations.find();

db.articles.updateMany({}, { "$unset": { "slug": 1, "priority": 1 } });
db.schema_migrations.deleteOne({ _id: ObjectId('691a7c08a80321b7af463763') });
