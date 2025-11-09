from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.detection_service import DetectionService
from app.schemas.prediction import PredictionResponse, BoundingBox
from app.utils.image_io import load_image_from_bytes
import os

router = APIRouter()

# Initialize detection service
# Use environment variable or default to pre-trained model
MODEL_PATH = os.getenv("MODEL_PATH", None)
detection_service = DetectionService(model_path=MODEL_PATH)


@router.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    """
    Car detection endpoint.
    
    Accepts an image file and returns detected car bounding boxes.
    """
    # Validate file type
    if not file.content_type or not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read image bytes
        image_bytes = await file.read()
        
        # Get image dimensions
        image = load_image_from_bytes(image_bytes)
        img_width, img_height = image.size
        
        # Run detection
        detections = detection_service.detect_cars(image_bytes)
        
        # Convert to response format
        boxes = [
            BoundingBox(
                x1=det["x1"],
                y1=det["y1"],
                x2=det["x2"],
                y2=det["y2"],
                confidence=det["confidence"],
                class_name=det["class_name"]
            )
            for det in detections
        ]
        
        return PredictionResponse(
            boxes=boxes,
            image_width=img_width,
            image_height=img_height
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

