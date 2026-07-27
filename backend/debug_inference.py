from ultralytics import YOLO
import os

MODEL_PATH = 'C:/Users/nainv/Downloads/Major_Project_AI-20260725T085012Z-1-001/Major_Project_AI/models/YOLO11_RSNA_v1/weights/best.pt'

images = [
    'C:/Users/nainv/Downloads/Major_Project_AI-20260725T085012Z-1-001/Major_Project_AI/data/raw/valid/images/0025d2de-bd78-4d36-9f72-e15a5e22ca82_png.rf.6d778ae30e096f5c62528edfc33ca474.jpg',
    'C:/Users/nainv/Downloads/Major_Project_AI-20260725T085012Z-1-001/Major_Project_AI/data/raw/train/images/00a05408-8291-4231-886e-13763e103161_png.rf.04f312708a009145170bcc125b344bdf.jpg',
    'C:/Users/nainv/Downloads/Major_Project_AI-20260725T085012Z-1-001/Major_Project_AI/backend/uploads/88e9585c4713496084a314dc797d73b8.jpg',
]

model = YOLO(MODEL_PATH)
print('model_path=', MODEL_PATH)
print('task=', model.task)
print('names=', model.names)
print('num_classes=', len(model.names))

for image in images:
    print('IMAGE', os.path.basename(image))
    results = model.predict(source=image, conf=0.25, imgsz=640, verbose=False)
    r = results[0]
    print('boxes', len(r.boxes))
    print('result.names', r.names)
    if len(r.boxes):
        for i, box in enumerate(r.boxes):
            print(' box', i, 'cls', int(box.cls[0]), 'conf', float(box.conf[0]), 'xyxy', box.xyxy[0].tolist())
    else:
        print(' no boxes')
    print('---')
