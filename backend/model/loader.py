"""
loader.py

This module loads the trained YOLO model only once when the
FastAPI application starts.

Other files should import get_model() instead of loading
the model again.
"""

from ultralytics import YOLO
from pathlib import Path

from config import MODEL_PATH


# ==========================================================
# Global Model Variable
# ==========================================================

_model = None


# ==========================================================
# Load Model
# ==========================================================

def load_model():
    """
    Loads the YOLO model into memory.

    This function should be called only once when
    the FastAPI server starts.

    Returns:
        YOLO: Loaded YOLO model
    """

    global _model

    # If already loaded, return it
    if _model is not None:
        print("✅ Model already loaded.")
        return _model

    # Check if model file exists
    if not Path(MODEL_PATH).exists():
        raise FileNotFoundError(
            f"Model not found:\n{MODEL_PATH}"
        )

    print("Loading YOLO model...")
    print("Loading model from:", MODEL_PATH)

    _model = YOLO(str(MODEL_PATH))

    print("✅ YOLO model loaded successfully.")

    return _model


# ==========================================================
# Get Model
# ==========================================================

def get_model():
    """
    Returns the already loaded model.

    If the model hasn't been loaded yet,
    it loads it automatically.

    Returns:
        YOLO
    """

    global _model

    if _model is None:
        return load_model()

    return _model