from fastapi import FastAPI
from app.api.routes import predict
from app.core.cors import setup_cors

app = FastAPI(title="Car Detector API", version="1.0.0")

# Setup CORS
setup_cors(app)

# Include routers
app.include_router(predict.router, prefix="/api", tags=["predict"])


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

