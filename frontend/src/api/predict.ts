const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface PredictionResponse {
  message?: string;
  boxes?: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    confidence: number;
    class_name: string;
  }>;
  image_width?: number;
  image_height?: number;
}

export async function predictCar(imageFile: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Prediction failed: ${response.statusText}`);
  }

  return response.json();
}

