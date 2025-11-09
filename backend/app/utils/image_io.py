"""
Utility functions for image input/output operations.
"""

from PIL import Image
import io


def load_image_from_bytes(image_bytes: bytes) -> Image.Image:
    """
    Load an image from bytes.
    
    Args:
        image_bytes: Raw image bytes
        
    Returns:
        PIL Image object
    """
    return Image.open(io.BytesIO(image_bytes))


def image_to_bytes(image: Image.Image, format: str = "JPEG") -> bytes:
    """
    Convert PIL Image to bytes.
    
    Args:
        image: PIL Image object
        format: Image format (default: JPEG)
        
    Returns:
        Image bytes
    """
    buffer = io.BytesIO()
    image.save(buffer, format=format)
    return buffer.getvalue()

