"""
prediction_service.py

Business logic for pneumonia prediction.

Responsibilities:
- Validate uploaded image
- Save image
- Call Predictor
- Return prediction result
"""

import uuid
import shutil
from pathlib import Path
from fastapi import UploadFile

from model.predictor import Predictor
from config import (
    UPLOAD_FOLDER,
    ALLOWED_EXTENSIONS,
    MAX_FILE_SIZE
)


class PredictionService:

    def __init__(self):
        self.predictor = Predictor()

    def validate_file(self, file: UploadFile):
        """
        Validate uploaded image.
        """

        if file.filename is None:
            raise ValueError("Filename is missing.")

        extension = Path(file.filename).suffix.lower().replace(".", "")

        if extension not in ALLOWED_EXTENSIONS:
            raise ValueError(
                f"Unsupported file type: {extension}"
            )

    async def save_file(self, file: UploadFile):
        """
        Save uploaded image.

        Returns:
            Path to saved image
        """

        self.validate_file(file)

        extension = Path(file.filename).suffix.lower()

        unique_name = f"{uuid.uuid4().hex}{extension}"

        save_path = UPLOAD_FOLDER / unique_name

        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return save_path

    async def predict(self, file: UploadFile):
        """
        Complete prediction workflow.
        """

        image_path = await self.save_file(file)

        result = self.predictor.predict(
            str(image_path)
        )

        return result