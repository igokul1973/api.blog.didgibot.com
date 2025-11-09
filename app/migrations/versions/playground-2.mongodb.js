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

// db["users"].aggregate([
//     {"$match": {"_id": ObjectId("683b500788640377526d34e6")}},
//     {"$unwind": "$articles"},
//     {"$match": {"articles.priority": {"$exists": False}}},
//     {"$project": {"_id": 1, "articles.id": 1, "articles.priority": 1}},
// ]).to_list(None)

// Get collection "users" schema showing all fields
// db.getCollection("users").getIndexes();
// db.users.find({}, { project: { _id: 0 } });
// db.articles.find({ slug: { $exists: false } }, { priority: 1, slug: 1 });

// Give me the count of all articles
// db.getCollection("articles").find({slug: null}).count();
