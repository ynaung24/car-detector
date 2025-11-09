# 🚗 Car Detector

A full-stack AI application for car detection using YOLO (You Only Look Once) object detection model.

## Project Structure

- **backend/**: FastAPI application with YOLO model integration
- **frontend/**: React + TypeScript + Vite frontend application
- **infra/**: Deployment scripts and infrastructure configuration

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Python 3.11+ (for local development)
- Node.js 20+ (for local development)

### Quick Start

1. **Install Backend Dependencies** (optional, for local development):
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Install Frontend Dependencies** (optional, for local development):
   ```bash
   cd frontend
   npm install
   ```

3. **Run with Docker Compose**:
   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

4. **Access the Application**:
   - Frontend UI: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Development

### Backend

The backend runs on port 8000 and provides:
- `/predict` - Car detection endpoint
- `/health` - Health check endpoint

### Frontend

The frontend runs on port 5173 and provides a React-based UI for uploading images and viewing detection results.

## Next Steps

- Integrate YOLO model for actual car detection
- Add image upload and processing
- Display bounding boxes on images
- Add metrics and analytics panel

