"""
Detection service for car detection using YOLO model.
"""
import os
from typing import List, Dict
from ultralytics import YOLO
from app.utils.image_io import load_image_from_bytes
import numpy as np


class DetectionService:
    def __init__(self, model_path: str = None):
        """
        Initialize the detection service with a YOLO model.
        
        Args:
            model_path: Path to YOLO model file (.pt). If None, uses pre-trained YOLOv8.
        """
        if model_path and os.path.exists(model_path):
            self.model = YOLO(model_path)
            print(f"Loaded custom model from {model_path}")
        else:
            # Use pre-trained YOLOv8n (nano) model - lightweight and fast
            # This will auto-download on first use
            self.model = YOLO('yolov8n.pt')
            print("Using pre-trained YOLOv8n model")
        
        # COCO class 2 is 'car' in YOLO
        self.car_class_id = 2

    def detect_cars(self, image_bytes: bytes, conf_threshold: float = 0.25) -> List[Dict]:
        """
        Detect cars in an image using YOLO.
        
        Args:
            image_bytes: Raw image bytes
            conf_threshold: Confidence threshold for detections (default: 0.25)
            
        Returns:
            List of detected bounding boxes with format:
            [
                {
                    "x1": float, "y1": float, "x2": float, "y2": float,
                    "confidence": float, "class_name": str
                },
                ...
            ]
        """
        # Load image from bytes
        image = load_image_from_bytes(image_bytes)
        
        # Convert PIL to numpy array for YOLO
        img_array = np.array(image)
        
        # Run inference
        results = self.model(img_array, conf=conf_threshold, verbose=False)
        
        detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Check if detection is a car (class_id == 2)
                class_id = int(box.cls[0])
                if class_id == self.car_class_id:
                    # Get bounding box coordinates
                    x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                    confidence = float(box.conf[0].cpu().numpy())
                    
                    detections.append({
                        "x1": float(x1),
                        "y1": float(y1),
                        "x2": float(x2),
                        "y2": float(y2),
                        "confidence": confidence,
                        "class_name": "car"
                    })
        
        return detections

