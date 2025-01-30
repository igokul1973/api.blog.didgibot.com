from enum import Enum


class ChangeStreamOperationType(Enum):
    INSERT = 'insert'
    UPDATE = 'update'
    REPLACE = 'replace'
    DELETE = 'delete'
    INVALIDATE = 'invalidate'
    DROP = 'drop'
    RENAME = 'rename'
