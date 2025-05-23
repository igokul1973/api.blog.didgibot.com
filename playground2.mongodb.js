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

const data = [
    {
        created_at: ISODate('2025-05-02T02:40:32.487Z'),
        updated_at: ISODate('2025-05-06T17:26:38.018Z'),
        translations: [
            {
                content: {
                    version: '2.31.0-rc.7',
                    time: 1747981604088,
                    blocks: [
                        {
                            id: '0FrL8jfZ2P',
                            type: 'paragraph',
                            data: {
                                text: 'Another very bad trial and text here and more editing document'
                            }
                        },
                        {
                            id: 'QqFfoktJv4',
                            type: 'code',
                            data: {
                                code: 'from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = "articles"\n        indexes = [\n            IndexModel(\n                [\n                    ("translations.header", TEXT),\n                    ("translations.tags.name", TEXT),\n                    ("translations.category.name", TEXT),\n                    ("translations.content.blocks.data.text", TEXT),\n                    ("translations.content.blocks.data.content", TEXT),\n                    ("translations.content.blocks.data.code", TEXT),\n                    ("translations.content.blocks.data.items.content", TEXT),\n                    ("translations.content.blocks.data.items.code", TEXT),\n                    ("translations.content.blocks.data.items.cols.text", TEXT),\n                    ("translations.content.blocks.data.items.cols.content", TEXT),\n                ],\n                name="search_article_index",\n                weights={\n                    "translations.header": 10,\n                    "translations.tags.name": 5,\n                    "translations.category.name": 5,\n                    "translations.content.blocks.data.text": 5,\n                    "translations.content.blocks.data.content": 5,\n                    "translations.content.blocks.data.code": 5,\n                    "translations.content.blocks.data.items.content": 5,\n                    "translations.content.blocks.data.items.code": 5,\n                    "translations.content.blocks.data.items.cols.text": 5,\n                    "translations.content.blocks.data.items.cols.content": 5,\n                },\n                default_language="russian",\n            )\n        ]',
                                showlinenumbers: true,
                                show_copy_button: true,
                                lang: 'scss'
                            }
                        }
                    ]
                },
                language: 'en',
                header: 'Ninth human on earth',
                is_published: false,
                published_at: null,
                category: {
                    id: ObjectId('682fc75e296bd21c1381726e'),
                    created_at: ISODate('2025-05-23T00:54:54.758Z'),
                    updated_at: ISODate('2025-05-23T00:54:54.758Z'),
                    name: 'Python'
                },
                tags: [
                    {
                        id: ObjectId('682fc722296bd21c13817269'),
                        created_at: ISODate('2025-05-23T00:53:54.237Z'),
                        updated_at: ISODate('2025-05-23T00:53:54.237Z'),
                        name: 'Tag 1'
                    }
                ]
            },
            {
                content: {
                    version: '2.31.0-rc.7',
                    time: 1747978266723,
                    blocks: [
                        {
                            id: 'k_U-_G5mMM',
                            type: 'paragraph',
                            data: {
                                text: 'Something else here'
                            }
                        },
                        {
                            id: 'blAGnW_Wtl',
                            type: 'code',
                            data: {
                                code: 'from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = "articles"\n        indexes = [\n            IndexModel(\n                [\n                    ("translations.header", TEXT),\n                    ("translations.tags.name", TEXT),\n                    ("translations.category.name", TEXT),\n                    ("translations.content.blocks.data.text", TEXT),\n                    ("translations.content.blocks.data.content", TEXT),\n                    ("translations.content.blocks.data.code", TEXT),\n                    ("translations.content.blocks.data.items.content", TEXT),\n                    ("translations.content.blocks.data.items.code", TEXT),\n                    ("translations.content.blocks.data.items.cols.text", TEXT),\n                    ("translations.content.blocks.data.items.cols.content", TEXT),\n                ],\n                name="search_article_index",\n                weights={\n                    "translations.header": 10,\n                    "translations.tags.name": 5,\n                    "translations.category.name": 5,\n                    "translations.content.blocks.data.text": 5,\n                    "translations.content.blocks.data.content": 5,\n                    "translations.content.blocks.data.code": 5,\n                    "translations.content.blocks.data.items.content": 5,\n                    "translations.content.blocks.data.items.code": 5,\n                    "translations.content.blocks.data.items.cols.text": 5,\n                    "translations.content.blocks.data.items.cols.content": 5,\n                },\n                default_language="russian",\n            )\n        ]',
                                showlinenumbers: true,
                                show_copy_button: true,
                                lang: 'python'
                            }
                        }
                    ]
                },
                language: 'ru',
                header: 'Десятый человек на Земле',
                is_published: false,
                published_at: null,
                category: {
                    id: ObjectId('682fc77b296bd21c13817270'),
                    created_at: ISODate('2025-05-23T00:55:23.992Z'),
                    updated_at: ISODate('2025-05-23T00:55:23.992Z'),
                    name: 'Питон'
                },
                tags: [
                    {
                        id: ObjectId('682fc741296bd21c1381726b'),
                        created_at: ISODate('2025-05-23T00:54:25.887Z'),
                        updated_at: ISODate('2025-05-23T00:54:25.887Z'),
                        name: 'Тэг 1'
                    }
                ]
            }
        ],
        author: {
            id: ObjectId('682fc6e9d1b8df284665d0fb'),
            created_at: ISODate('2025-05-23T00:52:57.120Z'),
            updated_at: ISODate('2025-05-23T16:34:48.745Z'),
            email: 'igk19@me.com',
            phone: '+1-\u202a5037655684\u202c',
            first_name: 'Igor',
            last_name: 'Kulebyakin',
            ip: '172.19.0.1',
            last_logged_at: ISODate('2025-05-23T16:22:44.482Z'),
            articles: [
                {
                    id: ObjectId('682ffc40688ab2c6443ff75d')
                }
            ]
        }
    },
    {
        created_at: ISODate('2025-04-01T04:40:32.487Z'),
        updated_at: ISODate('2025-05-10T22:26:38.018Z'),
        translations: [
            {
                content: {
                    version: '2.31.0-rc.7',
                    time: 1747981604088,
                    blocks: [
                        {
                            id: 'CDfz8_Jk-O',
                            type: 'paragraph',
                            data: {
                                text: 'Very long and may be not the best in the West'
                            }
                        },
                        {
                            id: 'QqpL-gbtJx1',
                            type: 'code',
                            data: {
                                code: 'from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = "articles"\n        indexes = [\n            IndexModel(\n                [\n                    ("translations.header", TEXT),\n                    ("translations.tags.name", TEXT),\n                    ("translations.category.name", TEXT),\n                    ("translations.content.blocks.data.text", TEXT),\n                    ("translations.content.blocks.data.content", TEXT),\n                    ("translations.content.blocks.data.code", TEXT),\n                    ("translations.content.blocks.data.items.content", TEXT),\n                    ("translations.content.blocks.data.items.code", TEXT),\n                    ("translations.content.blocks.data.items.cols.text", TEXT),\n                    ("translations.content.blocks.data.items.cols.content", TEXT),\n                ],\n                name="search_article_index",\n                weights={\n                    "translations.header": 10,\n                    "translations.tags.name": 5,\n                    "translations.category.name": 5,\n                    "translations.content.blocks.data.text": 5,\n                    "translations.content.blocks.data.content": 5,\n                    "translations.content.blocks.data.code": 5,\n                    "translations.content.blocks.data.items.content": 5,\n                    "translations.content.blocks.data.items.code": 5,\n                    "translations.content.blocks.data.items.cols.text": 5,\n                    "translations.content.blocks.data.items.cols.content": 5,\n                },\n                default_language="russian",\n            )\n        ]',
                                showlinenumbers: true,
                                show_copy_button: true,
                                lang: 'scss'
                            }
                        }
                    ]
                },
                language: 'en',
                header: 'Rabbits and rabbies',
                is_published: false,
                published_at: null,
                category: {
                    id: ObjectId('682fc75e296bd21c1381726e'),
                    created_at: ISODate('2025-05-23T00:54:54.758Z'),
                    updated_at: ISODate('2025-05-23T00:54:54.758Z'),
                    name: 'Python'
                },
                tags: [
                    {
                        id: ObjectId('682fc722296bd21c13817269'),
                        created_at: ISODate('2025-05-23T00:53:54.237Z'),
                        updated_at: ISODate('2025-05-23T00:53:54.237Z'),
                        name: 'Tag 1'
                    }
                ]
            },
            {
                content: {
                    version: '2.31.0-rc.7',
                    time: 1747978266723,
                    blocks: [
                        {
                            id: 'kT3S_J9zmH',
                            type: 'paragraph',
                            data: {
                                text: 'Something else here'
                            }
                        },
                        {
                            id: 'b02nw6OKl_l',
                            type: 'code',
                            data: {
                                code: 'from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = "articles"\n        indexes = [\n            IndexModel(\n                [\n                    ("translations.header", TEXT),\n                    ("translations.tags.name", TEXT),\n                    ("translations.category.name", TEXT),\n                    ("translations.content.blocks.data.text", TEXT),\n                    ("translations.content.blocks.data.content", TEXT),\n                    ("translations.content.blocks.data.code", TEXT),\n                    ("translations.content.blocks.data.items.content", TEXT),\n                    ("translations.content.blocks.data.items.code", TEXT),\n                    ("translations.content.blocks.data.items.cols.text", TEXT),\n                    ("translations.content.blocks.data.items.cols.content", TEXT),\n                ],\n                name="search_article_index",\n                weights={\n                    "translations.header": 10,\n                    "translations.tags.name": 5,\n                    "translations.category.name": 5,\n                    "translations.content.blocks.data.text": 5,\n                    "translations.content.blocks.data.content": 5,\n                    "translations.content.blocks.data.code": 5,\n                    "translations.content.blocks.data.items.content": 5,\n                    "translations.content.blocks.data.items.code": 5,\n                    "translations.content.blocks.data.items.cols.text": 5,\n                    "translations.content.blocks.data.items.cols.content": 5,\n                },\n                default_language="russian",\n            )\n        ]',
                                showlinenumbers: true,
                                show_copy_button: true,
                                lang: 'python'
                            }
                        }
                    ]
                },
                language: 'ru',
                header: 'Кролики и рабби',
                is_published: false,
                published_at: null,
                category: {
                    id: ObjectId('682fc77b296bd21c13817270'),
                    created_at: ISODate('2025-05-23T00:55:23.992Z'),
                    updated_at: ISODate('2025-05-23T00:55:23.992Z'),
                    name: 'Питон'
                },
                tags: [
                    {
                        id: ObjectId('682fc741296bd21c1381726b'),
                        created_at: ISODate('2025-05-23T00:54:25.887Z'),
                        updated_at: ISODate('2025-05-23T00:54:25.887Z'),
                        name: 'Тэг 1'
                    }
                ]
            }
        ],
        author: {
            id: ObjectId('682fc6e9d1b8df284665d0fb'),
            created_at: ISODate('2025-05-23T00:52:57.120Z'),
            updated_at: ISODate('2025-05-23T16:34:48.745Z'),
            email: 'igk19@me.com',
            phone: '+1-\u202a5037655684\u202c',
            first_name: 'Igor',
            last_name: 'Kulebyakin',
            ip: '172.19.0.1',
            last_logged_at: ISODate('2025-05-23T16:22:44.482Z'),
            articles: [
                {
                    id: ObjectId('682ffc40688ab2c6443ff75d')
                }
            ]
        }
    }
];

const articles = [
    {
        "translations": [
            {
                "language": "en",
                "header": "Fifty fifth article",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "0_r_8jTjTP",
                            "type": "paragraph",
                            "data": {
                                "text": "Hope for the best"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "QqRk-EktJv4",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Сто Четвертая",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747978266723,
                    "blocks": [
                        {
                            "id": "kAQ0_G5mMM",
                            "type": "paragraph",
                            "data": {
                                "text": "My best of the hellish helicopters"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "blanNBoZtl",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2025-02-23T02:40:32.487",
        "updated_at": "2025-05-23T12:26:38.018",
        "__typename": "ArticleType"
    },
    {
        "translations": [
            {
                "language": "en",
                "header": "First articles",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "Nfspb8jfZ1P",
                            "type": "paragraph",
                            "data": {
                                "text": "Very strange matters"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "QqRfyZtJx1",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Джаваскрипт все еще скрипит",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747978266723,
                    "blocks": [
                        {
                            "id": "km35_dlmMM",
                            "type": "paragraph",
                            "data": {
                                "text": "Неизвестность Пелевина"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "bqZT6LkWtl",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2025-04-23T04:40:32.487",
        "updated_at": "2025-04-28T16:26:38.018",
        "__typename": "ArticleType"
    },
    {
        "translations": [
            {
                "language": "en",
                "header": "Different types of Go language",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "0_pb8j-Z2P",
                            "type": "paragraph",
                            "data": {
                                "text": "Another very bad trial and text here and more editing document"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "QqRfbZtJv4",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Дорохов и его команда",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747978266723,
                    "blocks": [
                        {
                            "id": "Sm9N_G8VM-",
                            "type": "paragraph",
                            "data": {
                                "text": "Нужные вещи всегда были здесь невовремя"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "bgSS6W_Wtl",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2025-05-23T10:40:32.487",
        "updated_at": "2025-05-23T10:26:38.018",
        "__typename": "ArticleType"
    },
    {
        "translations": [
            {
                "language": "en",
                "header": "Cabochones and their properties",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "00rL8jlK2P",
                            "type": "paragraph",
                            "data": {
                                "text": "Lost treasures be mine"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "QdJf_ktJv4",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Замыкание как признак величия",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747978266723,
                    "blocks": [
                        {
                            "id": "k_ULhG5mMM",
                            "type": "paragraph",
                            "data": {
                                "text": "Something else here"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "bNAGnw-Wtl",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2024-05-02T02:40:32.487",
        "updated_at": "2024-05-06T06:26:38.018",
        "__typename": "ArticleType"
    },
    {
        "translations": [
            {
                "language": "en",
                "header": "Normal as new crazy",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "C4fzifJkDe",
                            "type": "paragraph",
                            "data": {
                                "text": "Heating place is not the same as the fireplace"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "QqpLNoNtJx1",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Ненормальные идеи нормальных программистов",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747978266723,
                    "blocks": [
                        {
                            "id": "kT7sDJ9zmX",
                            "type": "paragraph",
                            "data": {
                                "text": "To be or not to be - in that the question!"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "b12nw9OLzmP",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2024-09-01T04:40:32.487",
        "updated_at": "2025-01-29T21:26:38.018",
        "__typename": "ArticleType"
    },
    {
        "translations": [
            {
                "language": "en",
                "header": "Croll and his parents",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "CDSouLJk1O",
                            "type": "paragraph",
                            "data": {
                                "text": "CT Scans go wired"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "QqDevDt6x1",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Пробуй сколько хочешь и ничего у тебя не получится!",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747978266723,
                    "blocks": [
                        {
                            "id": "KlhS3-9zMC",
                            "type": "paragraph",
                            "data": {
                                "text": "Wapes are no longer in"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "bLtAw26Kl_l",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2023-08-21T04:48:32.487",
        "updated_at": "2024-12-13T16:27:38.018",
        "__typename": "ArticleType"
    },
    {
        "translations": [
            {
                "language": "en",
                "header": "Full moon",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "0Dp-Gcfr1O",
                            "type": "paragraph",
                            "data": {
                                "text": "Kaching is not a real word. Lose it!"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "iq-FgETsx2",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Забытый всеми стул оказался кладом.",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747978266723,
                    "blocks": [
                        {
                            "id": "k6d6sf7mBC",
                            "type": "paragraph",
                            "data": {
                                "text": "Great and not only!"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "bQsLVOxutl",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2025-04-22T04:40:22.477",
        "updated_at": "2025-05-13T10:16:58.018",
        "__typename": "ArticleType"
    },
    {
        "translations": [
            {
                "language": "en",
                "header": "Freaks and their shows",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "CD_G8c-Z1O",
                            "type": "paragraph",
                            "data": {
                                "text": "The snadard way of losing it"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "QqrRrrRtx0",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Шестьсотая",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747978266723,
                    "blocks": [
                        {
                            "id": "km26_JroTC",
                            "type": "paragraph",
                            "data": {
                                "text": "Маньяк маньяку не товарищ"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "bqZL60KN-_",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2025-03-22T04:56:32.487",
        "updated_at": "2025-04-27T06:16:18.018",
        "__typename": "ArticleType"
    },
    {
        "translations": [
            {
                "language": "en",
                "header": "Horses from Mars",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1747981604088,
                    "blocks": [
                        {
                            "id": "0Sp_dAnZ1O",
                            "type": "paragraph",
                            "data": {
                                "text": "Next tough guy - next touchdown"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "S_WeCZtmx1",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "scss"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc75e296bd21c1381726e",
                    "name": "Python",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc722296bd21c13817269",
                        "name": "Tag 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            },
            {
                "language": "ru",
                "header": "Травести шоу давно закончилось",
                "content": {
                    "version": "2.31.0-rc.7",
                    "time": 1748026125951,
                    "blocks": [
                        {
                            "id": "km26_LzXVC",
                            "type": "paragraph",
                            "data": {
                                "text": "Волосатый друг лысого оказался медведем"
                            },
                            "__typename": "ContentBlockType"
                        },
                        {
                            "id": "bQdL6W_WDL",
                            "type": "code",
                            "data": {
                                "code": "from typing import Annotated\n\nfrom beanie import Document, Indexed\nfrom pydantic import Field\nfrom pymongo import ASCENDING, TEXT, IndexModel\n\nfrom app.models.pydantic import ArticleModel, CategoryModel, TagModel, UserModel\n\n\nclass ArticleDocument(Document, ArticleModel):\n    class Settings:\n        name = \"articles\"\n        indexes = [\n            IndexModel(\n                [\n                    (\"translations.header\", TEXT),\n                    (\"translations.tags.name\", TEXT),\n                    (\"translations.category.name\", TEXT),\n                    (\"translations.content.blocks.data.text\", TEXT),\n                    (\"translations.content.blocks.data.content\", TEXT),\n                    (\"translations.content.blocks.data.code\", TEXT),\n                    (\"translations.content.blocks.data.items.content\", TEXT),\n                    (\"translations.content.blocks.data.items.code\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.text\", TEXT),\n                    (\"translations.content.blocks.data.items.cols.content\", TEXT),\n                ],\n                name=\"search_article_index\",\n                weights={\n                    \"translations.header\": 10,\n                    \"translations.tags.name\": 5,\n                    \"translations.category.name\": 5,\n                    \"translations.content.blocks.data.text\": 5,\n                    \"translations.content.blocks.data.content\": 5,\n                    \"translations.content.blocks.data.code\": 5,\n                    \"translations.content.blocks.data.items.content\": 5,\n                    \"translations.content.blocks.data.items.code\": 5,\n                    \"translations.content.blocks.data.items.cols.text\": 5,\n                    \"translations.content.blocks.data.items.cols.content\": 5,\n                },\n                default_language=\"russian\",\n            )\n        ]",
                                "showlinenumbers": true,
                                "show_copy_button": true,
                                "lang": "python"
                            },
                            "__typename": "ContentBlockType"
                        }
                    ],
                    "__typename": "ContentType"
                },
                "is_published": false,
                "published_at": null,
                "category": {
                    "id": "682fc77b296bd21c13817270",
                    "name": "Питон",
                    "__typename": "CategoryType"
                },
                "tags": [
                    {
                        "id": "682fc741296bd21c1381726b",
                        "name": "Тэг 1",
                        "__typename": "TagType"
                    }
                ],
                "__typename": "TranslationType"
            }
        ],
        "created_at": "2022-11-23T04:40:32.487",
        "updated_at": "2023-11-27T19:48:49.070",
        "__typename": "ArticleType"
    }
];

db.articles.insertMany(articles);

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
