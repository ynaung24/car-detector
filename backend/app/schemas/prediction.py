from pydantic import BaseModel
from typing import List, Optional


class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    confidence: float
    class_name: str


class PredictionResponse(BaseModel):
    boxes: List[BoundingBox]
    image_width: int
    image_height: int

