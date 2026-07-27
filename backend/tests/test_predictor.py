import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from model.predictor import Predictor


class DummyBox:
    def __init__(self, confidence: float):
        self.conf = [confidence]
        self.cls = [0]
        self.xyxy = [[0, 0, 100, 100]]


class DummyResult:
    def __init__(self, boxes):
        self.boxes = boxes

    def plot(self):
        return b"image"


def test_no_boxes_are_reported_as_uncertain(monkeypatch):
    class DummyModel:
        def predict(self, **kwargs):
            return [DummyResult([])]

    predictor = Predictor.__new__(Predictor)
    predictor.model = DummyModel()

    result = predictor.predict("dummy.jpg")

    assert result["prediction"] == "Uncertain"
    assert result["assessment"].startswith("The model did not detect")
    assert result["warning_level"] == "Medium"
    assert result["confidence"] == 0.0


def test_low_confidence_boxes_are_reported_as_uncertain(monkeypatch):
    class DummyModel:
        def predict(self, **kwargs):
            return [DummyResult([DummyBox(0.08)])]

    predictor = Predictor.__new__(Predictor)
    predictor.model = DummyModel()

    result = predictor.predict("dummy.jpg")

    assert result["prediction"] == "Uncertain"
    assert result["warning_level"] == "Medium"
    assert result["confidence"] == 0.0
