from datetime import UTC, datetime, timedelta, timezone

d1 = {
    "title": "title one",
    "description": "description one",
    "content": "content one",
    "bla1": {
        "title": "title one",
        "description": "description two",
    }
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
    }
}


def is_token_near_expiration(payload):
    exp = payload['exp']
    now = datetime.now(UTC)
    expiration_time = datetime.fromtimestamp(exp, tz=UTC)
    td = timedelta(minutes=5)
    five_minutes_before_expiration = expiration_time - td
    r = five_minutes_before_expiration - now
    r = now >= five_minutes_before_expiration
    return r


is_token_near_expiration({"exp": 1743543000})
# print(d1 | d2)

