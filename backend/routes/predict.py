"""
predict.py

Prediction API endpoint.
Receives uploaded X-ray images and returns
the AI prediction.
"""

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from services.prediction_service import PredictionService

# Create router
router = APIRouter()

# Create service object
prediction_service = PredictionService()


@router.post(
    "/predict",
    tags=["Prediction"]
)
async def predict_image(
    image: UploadFile = File(...)
):
    """
    Predict pneumonia from uploaded X-ray image.

    Args:
        image (UploadFile): Uploaded image

    Returns:
        JSON prediction
    """

    try:

        result = await prediction_service.predict(image)

        return {
            "success": True,
            "data": result
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except FileNotFoundError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )