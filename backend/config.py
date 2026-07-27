"""
config.py

Central configuration file for the PneumoScan AI backend.

All project paths and settings are defined here so they
can be reused throughout the backend.
"""

from pathlib import Path

# ==========================================================
# PROJECT ROOT
# ==========================================================

# backend/
BACKEND_DIR = Path(__file__).resolve().parent

# Major_Project_AI/
PROJECT_ROOT = BACKEND_DIR.parent


# ==========================================================
# MODEL PATH
# ==========================================================

MODEL_PATH = (
    PROJECT_ROOT
    / "models"
    / "YOLO11_RSNA_v1"
    / "weights"
    / "best.pt"
)


# ==========================================================
# FOLDERS
# ==========================================================

UPLOAD_FOLDER = BACKEND_DIR / "uploads"

PREDICTION_FOLDER = BACKEND_DIR / "predictions"


# Create folders automatically if they don't exist
UPLOAD_FOLDER.mkdir(exist_ok=True)

PREDICTION_FOLDER.mkdir(exist_ok=True)


# ==========================================================
# IMAGE SETTINGS
# ==========================================================

ALLOWED_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png"
}

MAX_FILE_SIZE = 10 * 1024 * 1024
# 10 MB


# ==========================================================
# YOLO SETTINGS
# ==========================================================

CONFIDENCE_THRESHOLD = 0.25

DETECTION_CONFIDENCE_THRESHOLD = 0.25
# Minimum confidence for a valid detection.
# Below this, the result is "Uncertain" even if boxes exist.

IMAGE_SIZE = 640


# ==========================================================
# API SETTINGS
# ==========================================================

HOST = "0.0.0.0"

PORT = 8000


# ==========================================================
# APPLICATION INFO
# ==========================================================

APP_NAME = "PneumoScan AI"

VERSION = "1.0.0"