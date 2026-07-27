from dataclasses import dataclass
from typing import Any, Callable, Optional

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
    handler: Callable[[ToolContext, Any], Any]  # Actually (ToolContext, **kwargs)
    confirmation_template: Optional[Callable[[Any], str]] = None
