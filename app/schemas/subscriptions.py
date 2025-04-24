import asyncio
from typing import AsyncGenerator, Optional

import strawberry
from fastapi import HTTPException
from fastapi_events.handlers.local import local_handler
from fastapi_events.typing import Event
from jose import JWTError
from loguru import logger

from app.models.utils.errors import ConfigException


class MyEvent:
    def __init__(self):
        self._queue = asyncio.Queue()

    def __aiter__(self):
        return self

    async def __anext__(self) -> Optional[Event]:
        try:
            return await self._queue.get()
        except asyncio.CancelledError:
            raise
        except Exception as e:
            raise StopAsyncIteration from e

    def push(self, event):
        self._queue.put_nowait(event)

    async def aclose(self):
        self._queue.put_nowait(None)
        await self._queue.join()


my_event = MyEvent()


@local_handler.register(event_name="token-refresh")
async def handle_all_events(event: Event):
    # event handlers can be coroutine function too (`async def`)
    my_event.push(event)


@strawberry.type
class Subscription:
    @strawberry.subscription
    async def jwt(self, info: strawberry.Info) -> AsyncGenerator[str, None]:
        from app.schemas.schema import AuthorizationService

        bearer_token = await info.context.token

        if not bearer_token:
            e = "JWT token is missing"
            logger.error(e)
            raise HTTPException(status_code=401, detail=str(e))
        try:
            AuthorizationService.get_token_payload(bearer_token)
            async for e in my_event:
                if not e:
                    break
                k = e[1].model_dump_json()
                yield k
        except ConfigException as e:
            raise HTTPException(status_code=401, detail=str(e))
        except (KeyError, JWTError):
            raise HTTPException(
                status_code=401, detail=AuthorizationService.INVALID_TOKEN_MESSAGE
            )
