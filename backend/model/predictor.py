"""
predictor.py

Handles YOLO inference.

Responsibilities:
- Receive an image path
- Run prediction
- Extract bounding boxes
- Save annotated image
- Return structured prediction results
"""

import uuid
import time

import cv2

from model.loader import get_model
from config import (
    PREDICTION_FOLDER,
    CONFIDENCE_THRESHOLD,
    DETECTION_CONFIDENCE_THRESHOLD,
    IMAGE_SIZE
)


class Predictor:
    """
    Handles all prediction logic.
    """

    def __init__(self):
        self.model = get_model()

    def predict(self, image_path: str):
        """
        Perform inference on an image.

        Args:
            image_path (str)

        Returns:
            dict
        """

        start = time.time()

        results = self.model.predict(
            source=image_path,
            conf=CONFIDENCE_THRESHOLD,
            imgsz=IMAGE_SIZE,
            verbose=False
        )

        r = results[0]

        print("\n========== RAW MODEL DEBUG ==========")
        print("Image:", image_path)
        print("Model task:", self.model.task)
        print("Model names:", self.model.names)
        print("Number of detected boxes:", len(r.boxes))

        if len(r.boxes) > 0:
            print("\nDetected Boxes:")
            for i, box in enumerate(r.boxes):
                print(f"  Box {i+1}: cls={int(box.cls[0])}, conf={float(box.conf[0]):.4f}, xyxy={box.xyxy[0].tolist()}")
        else:
            print("\n  No boxes detected (below confidence threshold).")

        print("=====================================\n")

        boxes = []

        prediction = "Uncertain"
        max_confidence = 0.0

        # Collect all boxes above the base threshold
        if len(r.boxes) > 0:
            for box in r.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                confidence = float(box.conf[0])
                max_confidence = max(max_confidence, confidence)
                boxes.append({
                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2,
                    "confidence": round(confidence, 4)
                })

        # IMPORTANT: If the highest-confidence box is below DETECTION_CONFIDENCE_THRESHOLD,
        # treat this as "Uncertain" — the model found something but it's too weak to report.
        # This prevents low-confidence noise from being reported as "Pneumonia".
        if max_confidence > 0 and max_confidence < DETECTION_CONFIDENCE_THRESHOLD:
            prediction = "Uncertain"
        elif max_confidence > 0:
            prediction = "Pneumonia"
        else:
            prediction = "Uncertain"

        # ----------------------------------------------------
        # Generate assessment and health recommendations
        # ----------------------------------------------------

        if prediction == "Uncertain":
            assessment = (
                "The model did not detect any clear pneumonia findings in the uploaded X-ray, "
                "so this result should be treated as uncertain rather than definitive."
            )
            warning_level = "Medium"
            health_tips = [
                "Please consult a qualified healthcare professional for further evaluation.",
                "If symptoms are present, seek medical advice promptly.",
                "Monitor your symptoms and seek urgent care if breathing worsens or pain increases."
            ]
        elif prediction == "Pneumonia":
            assessment = (
                "The model detected findings that may be associated with pneumonia."
            )
            warning_level = "High"
            health_tips = [
                "Consult a healthcare professional as soon as possible.",
                "Do not self-medicate with antibiotics.",
                "Take adequate rest and drink plenty of fluids.",
                "Monitor your temperature and breathing.",
                "Avoid smoking and exposure to polluted air.",
                "Take medicines only if prescribed by a qualified doctor.",
                "Seek emergency medical care immediately if you experience severe shortness of breath, chest pain, confusion, or bluish lips."
            ]
        else:
            assessment = (
                "No signs of pneumonia were detected in the uploaded X-ray."
            )
            warning_level = "Low"
            health_tips = [
                "Stay hydrated by drinking enough water.",
                "Eat a balanced diet rich in fruits and vegetables.",
                "Exercise regularly to maintain lung health.",
                "Avoid smoking and second-hand smoke.",
                "Get 7–9 hours of quality sleep every night.",
                "Practice good hand hygiene to reduce infections.",
                "Consult a healthcare professional if symptoms persist despite this result."
            ]

        annotated = r.plot()

        output_name = f"{uuid.uuid4().hex}.jpg"

        output_path = PREDICTION_FOLDER / output_name

        cv2.imwrite(str(output_path), annotated)

        end = time.time()

        # Return confidence=None for Uncertain (no valid detection)
        # so the frontend can display "Not Available" instead of "0.0%"
        return {
            "prediction": prediction,
            "confidence": None if prediction == "Uncertain" else round(max_confidence, 4),
            "processing_time": round(end - start, 3),
            "annotated_image": output_name,
            "boxes": boxes if prediction == "Pneumonia" else [],
            "assessment": assessment,
            "health_tips": health_tips,
            "warning_level": warning_level,
            "disclaimer": (
                "This AI prediction is intended for informational purposes only "
                "and is not a medical diagnosis. Please consult a qualified "
                "healthcare professional for medical advice."
            )
        }

