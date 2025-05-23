from datetime import datetime

d1 = {
    "title": "title one",
    "description": "description one",
    "content": "content one",
    "bla1": {
        "title": "title one",
        "description": "description two",
    },
}

d2 = {
    "title": "title two",
    "content": "content two",
    "bla1": {
        "title": "title one modified",
        "description": "description one modified",
    },
    "bla2": {
        "title": "title two",
        "description": "description two",
    },
}

date = datetime.now().isoformat(timespec="milliseconds")
print(date)
