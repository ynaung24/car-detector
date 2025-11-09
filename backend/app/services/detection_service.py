"""
Detection service for car detection using YOLO model.
Placeholder implementation for now.
"""


class DetectionService:
    def __init__(self, model_path: str):
        self.model_path = model_path
        # TODO: Load YOLO model here

    def detect_cars(self, image_bytes: bytes):
        """
        Detect cars in an image.
        
        Args:
            image_bytes: Raw image bytes
            
        Returns:
            List of detected bounding boxes
        """
        # TODO: Implement actual detection logic
        return []

