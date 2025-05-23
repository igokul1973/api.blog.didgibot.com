/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = "didgibot";
const collection = "NEW_COLLECTION_NAME";

// The current database to use.
use(database);

// Create a new collection.
// db.createCollection(collection);

// db.articles.find({
//     $text: { $search: "trouble" },
// });

// db.categories.find({
//     _id: ObjectId('681ce9f53aaee641aee2e2be'),
// });

const data = {
    // timestamps:
    "created_at": (new Date()).getTime(),
    "updated_at": (new Date()).getTime(),
    "translations": [
        {
            "language": "en",
            "header": "First Article",
            "content": {
                "version": "2.31.0-rc.7",
                "time": 1747961883289,
                "blocks": [
                    {
                        "id": "LZihsZN9EL",
                        "type": "paragraph",
                        "data": {
                            "text": "First article but will be added to the second"
                        }
                    },
                    {
                        "id": "13_1K_Yhv7",
                        "type": "header",
                        "data": {
                            "text": "Let's start here",
                            "level": 3
                        }
                    },
                    {
                        "id": "BH5-JOYcrp",
                        "type": "paragraph",
                        "data": {
                            "text": "The most amazing adventures of Heckleberry Finn and myself. I'll be damned!"
                        }
                    },
                    {
                        "id": "dKjgbA5s8S",
                        "type": "code",
                        "data": {
                            "code": "<p class=\"p1\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177); white-space: normal;\" data-empty=\"false\"><span class=\"s1\" style=\"font-kerning: none; color: rgb(184, 93, 213); -webkit-text-stroke-color: rgb(184, 93, 213);\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\">const</span></span></span></span></span></span></span><span class=\"s2\" style=\"font-kerning: none; background-color: rgb(30, 33, 39);\"> t = </span><span class=\"s3\" style=\"font-kerning: none; color: rgb(136, 185, 102); -webkit-text-stroke-color: rgb(136, 185, 102);\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\">'20s'</span></span></span></span></span></span></span><span class=\"s2\" style=\"font-kerning: none; background-color: rgb(30, 33, 39);\">;</span></p><p class=\"p2\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(184, 93, 213); -webkit-text-stroke-color: rgb(184, 93, 213); white-space: normal;\" data-empty=\"false\"><span class=\"s4\" style=\"font-kerning: none;\"><span class=\"hljs-function\"><span class=\"hljs-keyword\"><span class=\"hljs-function\"><span class=\"hljs-keyword\"><span class=\"hljs-function\"><span class=\"hljs-keyword\"><span class=\"hljs-function\"><span class=\"hljs-keyword\"><span class=\"hljs-function\"><span class=\"hljs-keyword\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span></span></span></span></span></span></span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"> </span></span></span></span></span></span></span><span class=\"s6\" style=\"font-kerning: none; color: rgb(81, 156, 233); -webkit-text-stroke-color: rgb(81, 156, 233);\"><span class=\"hljs-function\"><span class=\"hljs-title\"><span class=\"hljs-function\"><span class=\"hljs-title\"><span class=\"hljs-function\"><span class=\"hljs-title\"><span class=\"hljs-function\"><span class=\"hljs-title\"><span class=\"hljs-function\"><span class=\"hljs-title\"><span class=\"hljs-function\"><span class=\"hljs-title\">logT</span></span></span></span></span></span></span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\">(</span></span></span></span></span><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span>) </span></span></span></span></span></span>{</span></p><p class=\"p1\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177); white-space: normal;\" data-empty=\"false\"><span class=\"s4\" style=\"font-kerning: none;\">&nbsp; </span><span class=\"s7\" style=\"font-kerning: none; color: rgb(223, 180, 104); -webkit-text-stroke-color: rgb(223, 180, 104);\"><span class=\"hljs-built_in\"><span class=\"hljs-built_in\"><span class=\"hljs-built_in\"><span class=\"hljs-built_in\"><span class=\"hljs-built_in\"><span class=\"hljs-built_in\">console</span></span></span></span></span></span></span><span class=\"s4\" style=\"font-kerning: none;\">.log(t);</span></p><p class=\"p1\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177); white-space: normal;\" data-empty=\"false\"><span class=\"s4\" style=\"font-kerning: none;\">}</span></p><p class=\"p3\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177); min-height: 17px; white-space: normal;\" data-empty=\"true\"><span class=\"s4\" style=\"font-kerning: none;\"></span><br></p><p class=\"p2\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(184, 93, 213); -webkit-text-stroke-color: rgb(184, 93, 213); white-space: normal;\" data-empty=\"false\"><span class=\"s4\" style=\"font-kerning: none;\"><span class=\"hljs-class\"><span class=\"hljs-keyword\"><span class=\"hljs-class\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-class\"><span class=\"hljs-keyword\"><span class=\"hljs-class\"><span class=\"hljs-keyword\"><span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span></span></span></span></span></span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\"> </span></span></span></span></span></span><span class=\"s7\" style=\"font-kerning: none; color: rgb(223, 180, 104); -webkit-text-stroke-color: rgb(223, 180, 104);\"><span class=\"hljs-class\"><span class=\"hljs-title\"><span class=\"hljs-class\"><span class=\"hljs-title\"><span class=\"hljs-class\"><span class=\"hljs-title\"><span class=\"hljs-class\"><span class=\"hljs-title\"><span class=\"hljs-class\"><span class=\"hljs-title\">Arby</span></span></span></span></span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\"> </span></span></span></span></span>{</span></p><p class=\"p2\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(184, 93, 213); -webkit-text-stroke-color: rgb(184, 93, 213); white-space: normal;\" data-empty=\"false\"><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\">&nbsp; &nbsp; </span><span class=\"s4\" style=\"font-kerning: none;\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\">constructor</span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\">(<span class=\"hljs-params\"></span>) {</span></p><p class=\"p1\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177); white-space: normal;\" data-empty=\"false\"><span class=\"s4\" style=\"font-kerning: none;\">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class=\"s1\" style=\"font-kerning: none; color: rgb(184, 93, 213); -webkit-text-stroke-color: rgb(184, 93, 213);\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\">this</span></span></span></span></span></span></span><span class=\"s4\" style=\"font-kerning: none;\">.clever = </span><span class=\"s3\" style=\"font-kerning: none; color: rgb(136, 185, 102); -webkit-text-stroke-color: rgb(136, 185, 102);\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\">'not much'</span></span></span></span></span></span></span><span class=\"s4\" style=\"font-kerning: none;\">;</span></p><p class=\"p1\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177); white-space: normal;\" data-empty=\"false\"><span class=\"s4\" style=\"font-kerning: none;\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; </span>}</span></p><p class=\"p1\" style=\"margin: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177); white-space: normal;\" data-empty=\"false\"><span class=\"s4\" style=\"font-kerning: none;\">} <span class=\"Apple-converted-space\">&nbsp;</span></span></p>",
                            "lang": "javascript",
                            "theme": "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/atom-one-dark.min.css"
                        }
                    },
                    {
                        "id": "Ao41U9tWNO",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "Good",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "Bad",
                                    "meta": {},
                                    "items": []
                                },
                                {
                                    "content": "and",
                                    "meta": {},
                                    "items": [
                                        {
                                            "content": "Ugly",
                                            "meta": {},
                                            "items": []
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            },
            "is_published": false,
            "category": {
                "id": "682fc755296bd21c1381726d",
                "name": "Javascript"
            },
            "tags": [
                {
                    "id": "682fc722296bd21c13817269",
                    "name": "Tag 1"
                },
                {
                    "id": "682fc728296bd21c1381726a",
                    "name": "Tag 2"
                }
            ]
        },
        {
            "language": "ru",
            "header": "Первая статья",
            "content": {
                "version": "2.31.0-rc.7",
                "time": 1747962077759,
                "blocks": [
                    {
                        "id": "1J_QLVpqNm",
                        "type": "paragraph",
                        "data": {
                            "text": "Но будет еще и вторая, хоть это и первая статейка!"
                        }
                    },
                    {
                        "id": "LlTlLlrWag",
                        "type": "code",
                        "data": {
                            "code": "<p class=\"p1\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(155, 162, 177); margin: 0px; color: rgb(155, 162, 177); white-space: normal;\"><span class=\"s1\" style=\"font-kerning: none; color: rgb(184, 93, 213); -webkit-text-stroke-color: rgb(184, 93, 213);\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\">const</span></span></span></span><span class=\"s2\" style=\"font-kerning: none; background-color: rgb(30, 33, 39);\">&nbsp;t =&nbsp;</span><span class=\"s3\" style=\"font-kerning: none; color: rgb(136, 185, 102); -webkit-text-stroke-color: rgb(136, 185, 102);\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\">'20s'</span></span></span></span><span class=\"s2\" style=\"font-kerning: none; background-color: rgb(30, 33, 39);\">;</span></p><p class=\"p2\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(184, 93, 213); margin: 0px; color: rgb(184, 93, 213); white-space: normal;\"><span class=\"s4\" style=\"font-kerning: none;\"><span class=\"hljs-function\"><span class=\"hljs-keyword\"><span class=\"hljs-function\"><span class=\"hljs-keyword\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\"><span class=\"hljs-function\"><span class=\"hljs-function\">&nbsp;</span></span></span><span class=\"s6\" style=\"font-kerning: none; color: rgb(81, 156, 233); -webkit-text-stroke-color: rgb(81, 156, 233);\"><span class=\"hljs-function\"><span class=\"hljs-title\"><span class=\"hljs-function\"><span class=\"hljs-title\"><span class=\"hljs-function\"><span class=\"hljs-title\">logT</span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\"><span class=\"hljs-function\">(</span></span></span></span></span><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span><span class=\"hljs-function\"><span class=\"hljs-params\"></span>)&nbsp;</span></span></span></span></span></span>{</span></p><p class=\"p1\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(155, 162, 177); margin: 0px; color: rgb(155, 162, 177); white-space: normal;\"><span class=\"s4\" style=\"font-kerning: none;\">&nbsp;&nbsp;</span><span class=\"s7\" style=\"font-kerning: none; color: rgb(223, 180, 104); -webkit-text-stroke-color: rgb(223, 180, 104);\"><span class=\"hljs-built_in\"><span class=\"hljs-built_in\"><span class=\"hljs-built_in\">console</span></span></span></span><span class=\"s4\" style=\"font-kerning: none;\">.log(t);</span></p><p class=\"p1\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(155, 162, 177); margin: 0px; color: rgb(155, 162, 177); white-space: normal;\"><span class=\"s4\" style=\"font-kerning: none;\">}</span></p><p class=\"p3\" data-empty=\"true\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(155, 162, 177); margin: 0px; color: rgb(155, 162, 177); min-height: 17px; white-space: normal;\"><span class=\"s4\" style=\"font-kerning: none;\"></span><br></p><p class=\"p2\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(184, 93, 213); margin: 0px; color: rgb(184, 93, 213); white-space: normal;\"><span class=\"s4\" style=\"font-kerning: none;\"><span class=\"hljs-class\"><span class=\"hljs-keyword\"><span class=\"hljs-class\"><span class=\"hljs-keyword\"><span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\"><span class=\"hljs-class\"><span class=\"hljs-class\">&nbsp;</span></span></span><span class=\"s7\" style=\"font-kerning: none; color: rgb(223, 180, 104); -webkit-text-stroke-color: rgb(223, 180, 104);\"><span class=\"hljs-class\"><span class=\"hljs-title\"><span class=\"hljs-class\"><span class=\"hljs-title\"><span class=\"hljs-class\"><span class=\"hljs-title\">Arby</span></span></span></span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\"><span class=\"hljs-class\">&nbsp;</span></span></span></span></span>{</span></p><p class=\"p2\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(184, 93, 213); margin: 0px; color: rgb(184, 93, 213); white-space: normal;\"><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\">&nbsp; &nbsp;&nbsp;</span><span class=\"s4\" style=\"font-kerning: none;\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\">constructor</span></span></span></span><span class=\"s5\" style=\"font-kerning: none; color: rgb(155, 162, 177); -webkit-text-stroke-color: rgb(155, 162, 177);\">(<span class=\"hljs-params\"></span>) {</span></p><p class=\"p1\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(155, 162, 177); margin: 0px; color: rgb(155, 162, 177); white-space: normal;\"><span class=\"s4\" style=\"font-kerning: none;\">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span class=\"s1\" style=\"font-kerning: none; color: rgb(184, 93, 213); -webkit-text-stroke-color: rgb(184, 93, 213);\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\"><span class=\"hljs-keyword\">this</span></span></span></span><span class=\"s4\" style=\"font-kerning: none;\">.clever =&nbsp;</span><span class=\"s3\" style=\"font-kerning: none; color: rgb(136, 185, 102); -webkit-text-stroke-color: rgb(136, 185, 102);\"><span class=\"hljs-string\"><span class=\"hljs-string\"><span class=\"hljs-string\">'not much'</span></span></span></span><span class=\"s4\" style=\"font-kerning: none;\">;</span></p><p class=\"p1\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(155, 162, 177); margin: 0px; color: rgb(155, 162, 177); white-space: normal;\"><span class=\"s4\" style=\"font-kerning: none;\"><span class=\"Apple-converted-space\">&nbsp; &nbsp;&nbsp;</span>}</span></p><p class=\"p1\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(155, 162, 177); margin: 0px; color: rgb(155, 162, 177); white-space: normal;\"><span class=\"s4\" style=\"font-kerning: none;\">}</span></p><p class=\"p1\" data-empty=\"false\" style=\"font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-variant-emoji: normal; font-stretch: normal; line-height: normal; font-family: Courier; -webkit-text-stroke-color: rgb(155, 162, 177); margin: 0px; color: rgb(155, 162, 177); white-space: normal;\"><span class=\"hljs-comment\"><span class=\"hljs-comment\">// Will add here a comment that would say - hey you, branching apple!</span></span></p>",
                            "lang": "Auto-detect",
                            "theme": "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/atom-one-dark.min.css"
                        }
                    },
                    {
                        "id": "nTTLZ0vgf9",
                        "type": "image",
                        "data": {
                            "caption": "",
                            "with_border": true,
                            "with_background": false,
                            "stretched": true,
                            "file": {
                                "url": "http://invoice-minio:9000/images-dgb-blog/article_Picture_2.jpg"
                            }
                        }
                    }
                ]
            },
            "is_published": false,
            "category": {
                "id": "682fc771296bd21c1381726f",
                "name": "ДжаваСкрипт"
            },
            "tags": [
                {
                    "id": "682fc748296bd21c1381726c",
                    "name": "Тэг 2"
                }
            ]
        }
    ]
};

db.articles.insert(data);

// db.categories.update({ name: "Cat 1" }, { $set: { name: "Cat 2" } });

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
