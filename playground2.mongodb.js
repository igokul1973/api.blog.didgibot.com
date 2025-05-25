/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = "didgibot";
const collection = "NEW_COLLECTION_NAME";

// The current database to use.
use(database);

// Create a new collection.
// db.createCollection(collection);

// db.articles.updateMany(
//     {
//         $expr: {
//             $gt: [
//                 { $size: { $filter: { input: "$translations", as: "t", cond: { $gt: [{ $strLenCP: "$$t.header" }, 40] } } } },
//                 0
//             ]
//         }
//     },
//     {
//         $set: {
//             "translations": {
//                 $map: {
//                     input: "$translations",
//                     as: "t",
//                     in: {
//                         header: { $substrCP: ["$$t.header", 0, 39] }
//                     }
//                 }
//             }
//         }
//     }
// );

db.articles.find();

// db.articles.deleteOne({
//     _id: ObjectId('6830d99cf561881dfa65de66')
// })

// db.categories.find({
//     _id: ObjectId('681ce9f53aaee641aee2e2be'),
// });

// db.articles.find({
//     $where: function() {
//         return this.translations.some((t) => t.header.length >= 40);
//     }
// });

