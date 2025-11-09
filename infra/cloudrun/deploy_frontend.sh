#!/bin/bash
# Deploy frontend to Google Cloud Run

set -e

PROJECT_ID=${PROJECT_ID:-"your-project-id"}
SERVICE_NAME="car-detector-frontend"
REGION=${REGION:-"us-central1"}
API_BASE_URL=${API_BASE_URL:-"https://car-detector-backend-xxxxx.run.app"}

echo "Building and deploying frontend to Cloud Run..."

# Build the frontend
cd frontend
npm install
npm run build

# Deploy to Cloud Run
gcloud run deploy ${SERVICE_NAME} \
  --source . \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --set-env-vars VITE_API_BASE_URL=${API_BASE_URL}

echo "Frontend deployed successfully!"

