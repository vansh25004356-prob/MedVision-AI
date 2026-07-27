"""
health.py

Health check endpoint for the backend.
"""

from fastapi import APIRouter

from config import APP_NAME, VERSION

# Create router
router = APIRouter()


@router.get(
    "/health",
    tags=["Health"]
)
def health_check():
    """
    Check if backend is running.
    """

    return {
        "status": "healthy",
        "application": APP_NAME,
        "version": VERSION,
        "message": "Backend is running successfully."
    }