"""
app.py

Main entry point of the PneumoScan AI backend.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from config import APP_NAME, VERSION, PREDICTION_FOLDER
from routes.health import router as health_router
from routes.predict import router as predict_router
from model.loader import load_model


# ==========================================================
# Create FastAPI Application
# ==========================================================

app = FastAPI(
    title=APP_NAME,
    version=VERSION,
    description="AI-powered Pneumonia Detection using YOLO11"
)


# ==========================================================
# Enable CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",   # React (Vite)
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# ==========================================================
# Startup Event
# ==========================================================

@app.on_event("startup")
async def startup_event():
    """
    Load the YOLO model when the server starts.
    """

    print("=" * 50)
    print("Starting PneumoScan AI Backend...")
    print("=" * 50)

    load_model()

    print("Backend Ready!")
    print("=" * 50)


# ==========================================================
# Root Endpoint
# ==========================================================

@app.get("/", tags=["Home"])
def home():
    return {
        "application": APP_NAME,
        "version": VERSION,
        "status": "running",
        "message": "Welcome to PneumoScan AI Backend"
    }


# ==========================================================
# Register Routes
# ==========================================================

app.mount("/predictions", StaticFiles(directory=str(PREDICTION_FOLDER)), name="predictions")

app.include_router(health_router)

app.include_router(predict_router)