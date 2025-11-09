# 🚗 Car Detector

A full-stack ML application for car detection using YOLO (You Only Look Once) object detection model. Upload images to detect cars with real-time bounding box visualization and detailed detection metrics.

## ✨ Features

- **Real-time Car Detection**: Powered by YOLOv8n (Ultralytics)
- **Interactive UI**: Upload images and see detections with bounding boxes
- **Detection Metrics**: View confidence scores, bounding box coordinates, and image details
- **Modern Stack**: FastAPI backend + React + TypeScript frontend
- **Docker Support**: Easy deployment with Docker Compose

## 📁 Project Structure

```
car-detector/
├── backend/              # FastAPI application with YOLO integration
│   ├── app/
│   │   ├── api/routes/   # API endpoints
│   │   ├── services/     # Detection service
│   │   ├── schemas/      # Pydantic models
│   │   └── utils/        # Utility functions
│   └── requirements.txt
├── frontend/             # React + TypeScript + Vite
│   └── src/
│       ├── components/   # React components
│       └── api/          # API client
├── data/                 # Training and testing images
└── infra/                # Deployment scripts
```

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Python 3.11+ (for local development)
- Node.js 20+ (for local development)
- Conda (optional, for local Python environment)

### Option 1: Docker Compose (Recommended)

1. **Start the services**:
   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

2. **Access the Application**:
   - Frontend UI: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

The YOLO model will automatically download on the first prediction request (~6MB for YOLOv8n).

### Option 2: Local Development

1. **Set up Conda environment** (optional):
   ```bash
   conda create -n car python=3.11
   conda activate car
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Run Backend**:
   ```bash
   uvicorn app.main:app --reload
   ```

4. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

5. **Run Frontend**:
   ```bash
   npm run dev
   ```

## 🔧 API Endpoints

### Backend (Port 8000)

- `POST /api/predict` - Upload an image file and get car detections
  - **Request**: Multipart form data with `file` field (image)
  - **Response**: JSON with bounding boxes, confidence scores, and image dimensions
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation (Swagger UI)

### Example API Request

```bash
curl -X POST http://localhost:8000/api/predict \
  -F "file=@path/to/image.jpg"
```

## 🎯 Usage

1. **Upload an Image**: Click "Upload Image" button and select an image file
2. **View Detections**: Bounding boxes are drawn on detected cars with green outlines
3. **Check Metrics**: See detection count, confidence scores, and bounding box coordinates in the metrics panel

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Ultralytics YOLO** - State-of-the-art object detection
- **PyTorch** - Deep learning framework
- **OpenCV** - Image processing
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Canvas API** - Bounding box rendering

## 📊 Model Information

- **Model**: YOLOv8n (nano) - Pre-trained on COCO dataset
- **Class**: Car (COCO class ID: 2)
- **Confidence Threshold**: 0.25 (default)
- **Custom Model**: Set `MODEL_PATH` environment variable to use a custom trained model

## 🔮 Future Enhancements

- Train custom YOLO model on car detection dataset
- Batch prediction for multiple images
- Model evaluation metrics and visualization
- Export predictions in submission format
- Fine-tuning utilities for domain-specific data
- Support for video input
- Real-time webcam detection

## 🐛 Troubleshooting

### Docker Issues

- **OpenCV errors**: System dependencies are included in the Dockerfile
- **PyTorch compatibility**: Using PyTorch <2.6.0 for compatibility with YOLO

## 📝 License

This project is open source and available for educational purposes.

