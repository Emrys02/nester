from dataclasses import dataclass
from typing import Any, Awaitable, Callable, Optional

from pydantic import BaseModel


@dataclass
class ToolContext:
    user_id: str
    request_id: str
    conversation_id: str
    authorization_header: str


@dataclass
class Tool:
    name: str
    description: str
    args_model: type[BaseModel]
    consequential: bool
    handler: Callable[..., Awaitable[Any]]
    confirmation_template: Optional[Callable[..., str]] = None
