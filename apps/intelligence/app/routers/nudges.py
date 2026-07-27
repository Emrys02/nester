from fastapi import APIRouter, Depends, HTTPException

from app.dependencies.auth import get_api_key
from app.models.nudge import NudgeCopyRequest, NudgeCopyResponse
from app.services.prometheus import generate_nudge_copy

router = APIRouter()

@router.post("/copy", response_model=NudgeCopyResponse)
async def generate_copy(request: NudgeCopyRequest, _=Depends(get_api_key)):
    try:
        return await generate_nudge_copy(
            nudge_type=request.nudge_type,
            facts=request.facts,
            segment=request.segment,
            request_id=request.request_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
