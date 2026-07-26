from pydantic import BaseModel
from typing import Dict

class NudgeCopyRequest(BaseModel):
    nudge_type: str
    segment: str
    facts: Dict[str, str]
    request_id: str = ""

class NudgeCopyResponse(BaseModel):
    title: str
    body: str
