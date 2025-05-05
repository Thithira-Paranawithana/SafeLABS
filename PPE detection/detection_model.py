import os
import json
import cv2
import numpy as np
from ultralytics import YOLO
# from IPython.display import display, Image
# import torch
# from datasets import load_dataset
from PIL import Image as PILImage

import os
import json
from ultralytics import YOLO
import torch
import cv2

class PPEDetector:
    def __init__(self):
        self.classes = ['Coverall', 'Face_Shield', 'Gloves', 'Goggles', 'Mask']

    def prepare_data(self, train_json, test_json):
        """
        Prepare dataset from COCO-format JSON files.
        """
        # Create directories
        os.makedirs('PPE_YOLO/images/train', exist_ok=True)
        os.makedirs('PPE_YOLO/images/val', exist_ok=True)
        os.makedirs('PPE_YOLO/labels/train', exist_ok=True)
        os.makedirs('PPE_YOLO/labels/val', exist_ok=True)

        def convert_to_yolo(json_file, split_name):
            with open(json_file, 'r') as f:
                data = json.load(f)

            # Dictionary for image dimensions
            image_info = {item["id"]: (item["width"], item["height"], item["file_name"]) for item in data["images"]}

            # Process annotations
            for annotation in data["annotations"]:
                image_id = annotation["image_id"]
                category_id = annotation["category_id"] - 1  # YOLO class IDs start from 0
                bbox = annotation["bbox"]

                # Convert COCO format bbox to YOLO format
                x, y, w, h = bbox
                img_width, img_height, img_file = image_info[image_id]
                x_center = (x + w / 2) / img_width
                y_center = (y + h / 2) / img_height
                w /= img_width
                h /= img_height

                # Skip invalid or out-of-bounds bounding boxes
                if not (0 <= x_center <= 1 and 0 <= y_center <= 1 and 0 <= w <= 1 and 0 <= h <= 1):
                    print(f"WARNING ⚠️ {img_file}: Skipping annotation with out-of-bounds coordinates")
                    continue

                # Copy image to the corresponding directory
                image_src_path = os.path.join('images', img_file)
                image_dest_path = f'PPE_YOLO/images/{split_name}/{img_file}'
                if not os.path.exists(image_dest_path):
                    os.makedirs(os.path.dirname(image_dest_path), exist_ok=True)
                    if os.path.exists(image_src_path):
                        os.rename(image_src_path, image_dest_path)

                # Append annotation to the label file corresponding to the image
                label_file = os.path.join(f'PPE_YOLO/labels/{split_name}', f"{os.path.splitext(img_file)[0]}.txt")
                with open(label_file, 'a') as lf:
                    lf.write(f"{category_id} {x_center:.6f} {y_center:.6f} {w:.6f} {h:.6f}\n")

        # Convert train and test annotations
        print("Processing train data...")
        convert_to_yolo(train_json, 'train')
        print("Processing validation data...")
        convert_to_yolo(test_json, 'val')

        # Create dataset.yaml
        yaml_content = f"""
path: {os.getcwd()}/PPE_YOLO
train: images/train
val: images/val
names:
  0: Coverall
  1: Face_Shield
  2: Gloves
  3: Goggles
  4: Mask
        """

        with open('dataset.yaml', 'w') as f:
            f.write(yaml_content)

        # Print dataset statistics
        train_images = len(os.listdir('PPE_YOLO/images/train'))
        val_images = len(os.listdir('PPE_YOLO/images/val'))
        print(f"\nDataset prepared successfully:")
        print(f"Training images: {train_images}")
        print(f"Validation images: {val_images}")

    def train_model(self, epochs=50):
        """
        Train YOLOv8 model
        """
        # Initialize model
        model = YOLO('yolov8n.pt')  # Use YOLOv8 nano model

        # Train
        results = model.train(
            data='dataset.yaml',
            epochs=epochs,
            imgsz=640,
            batch=16,
            device=0 if torch.cuda.is_available() else 'cpu',
            project='PPE_Detection',
            name='train'
        )

        print(f"\nTraining completed:")
        print(f"Best model saved at: {results.best}")
        return model

    def test_image(self, model_path, image_path, conf_threshold=0.5):
        """
        Test model on a single image
        """
        model = YOLO(model_path)
        results = model.predict(image_path, conf=conf_threshold)[0]

        # Load and process image
        img = cv2.imread(image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Draw predictions
        for box in results.boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            conf = box.conf[0]
            cls = int(box.cls[0])

            cv2.rectangle(img,
                          (int(x1), int(y1)),
                          (int(x2), int(y2)),
                          (0, 255, 0), 2)
            cv2.putText(img,
                        f'{self.classes[cls]} {conf:.2f}',
                        (int(x1), int(y1)-10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.9,
                        (0, 255, 0),
                        2)

        return img

    def webcam_detection(self, model_path, conf_threshold=0.5):
        """
        Real-time detection using webcam
        """
        model = YOLO(model_path)
        cap = cv2.VideoCapture(0)

        while cap.isOpened():
            success, frame = cap.read()
            if success:
                # Run inference
                results = model.predict(frame, conf=conf_threshold)[0]

                # Draw predictions
                for box in results.boxes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    conf = box.conf[0]
                    cls = int(box.cls[0])

                    cv2.rectangle(frame,
                                  (int(x1), int(y1)),
                                  (int(x2), int(y2)),
                                  (0, 255, 0), 2)
                    cv2.putText(frame,
                                f'{self.classes[cls]} {conf:.2f}',
                                (int(x1), int(y1)-10),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                0.9,
                                (0, 255, 0),
                                2)

                # Check if all required PPE is detected
                detected_classes = set([int(box.cls[0]) for box in results.boxes])
                all_ppe_present = all(i in detected_classes for i in range(len(self.classes)))

                # Display status
                status = "ACCESS GRANTED" if all_ppe_present else "ACCESS DENIED"
                color = (0, 255, 0) if all_ppe_present else (0, 0, 255)
                cv2.putText(frame, status, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

                # Display the frame
                cv2.imshow('PPE Detection', frame)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            else:
                break

        cap.release()
        cv2.destroyAllWindows()


# Initialize detector
detector = PPEDetector()

detector.webcam_detection("C:/Users/REDTECH/Documents/DM2/PPE detection/best.pt")