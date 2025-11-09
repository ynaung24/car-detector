"""
Utilities for loading and processing training data.
"""
import pandas as pd
import os
from pathlib import Path
from typing import List, Dict, Tuple
from PIL import Image


def load_training_labels(csv_path: str) -> pd.DataFrame:
    """
    Load training bounding box labels from CSV.
    
    Args:
        csv_path: Path to the training labels CSV file
        
    Returns:
        DataFrame with columns: image, xmin, ymin, xmax, ymax
    """
    df = pd.read_csv(csv_path)
    return df


def get_image_path(image_name: str, base_dir: str) -> str:
    """
    Get full path to an image file.
    
    Args:
        image_name: Name of the image file
        base_dir: Base directory containing images
        
    Returns:
        Full path to the image
    """
    return os.path.join(base_dir, image_name)


def load_image(image_path: str) -> Image.Image:
    """
    Load an image from file path.
    
    Args:
        image_path: Path to the image file
        
    Returns:
        PIL Image object
    """
    return Image.open(image_path)


def normalize_bbox(xmin: float, ymin: float, xmax: float, ymax: float, 
                   img_width: int, img_height: int) -> Tuple[float, float, float, float]:
    """
    Normalize bounding box coordinates to [0, 1] range.
    
    Args:
        xmin, ymin, xmax, ymax: Bounding box coordinates in pixels
        img_width, img_height: Image dimensions
        
    Returns:
        Normalized coordinates (x_center, y_center, width, height) in [0, 1]
    """
    x_center = ((xmin + xmax) / 2) / img_width
    y_center = ((ymin + ymax) / 2) / img_height
    width = (xmax - xmin) / img_width
    height = (ymax - ymin) / img_height
    return x_center, y_center, width, height


def denormalize_bbox(x_center: float, y_center: float, width: float, height: float,
                     img_width: int, img_height: int) -> Tuple[float, float, float, float]:
    """
    Convert normalized bounding box to pixel coordinates.
    
    Args:
        x_center, y_center, width, height: Normalized coordinates [0, 1]
        img_width, img_height: Image dimensions
        
    Returns:
        Pixel coordinates (xmin, ymin, xmax, ymax)
    """
    x_center_px = x_center * img_width
    y_center_px = y_center * img_height
    width_px = width * img_width
    height_px = height * img_height
    
    xmin = x_center_px - width_px / 2
    ymin = y_center_px - height_px / 2
    xmax = x_center_px + width_px / 2
    ymax = y_center_px + height_px / 2
    
    return xmin, ymin, xmax, ymax

