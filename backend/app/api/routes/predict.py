from fastapi import APIRouter

router = APIRouter()


@router.post("/predict")
async def predict():
    """Car detection endpoint (placeholder)"""
    return {"message": "ok"}

