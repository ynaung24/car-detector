#!/bin/bash
# Deploy backend to Google Cloud Run

set -e

PROJECT_ID=${PROJECT_ID:-"your-project-id"}
SERVICE_NAME="car-detector-backend"
REGION=${REGION:-"us-central1"}

echo "Building and deploying backend to Cloud Run..."

gcloud builds submit --tag gcr.io/${PROJECT_ID}/${SERVICE_NAME} ./backend

gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --set-env-vars MODEL_PATH=/app/models/best.pt

echo "Backend deployed successfully!"

