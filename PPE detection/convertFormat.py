import os
import json

# Paths to the dataset
json_file_train = 'annotations/train.json'
json_file_test = 'annotations/test.json'
images_dir = 'images'
output_labels_dir = 'image_labels'

# Create output directories
os.makedirs(os.path.join(output_labels_dir, "train"), exist_ok=True)
os.makedirs(os.path.join(output_labels_dir, "test"), exist_ok=True)

def convert_to_yolo(json_file, output_dir):
    with open(json_file, 'r') as f:
        data = json.load(f)

    # Dictionary for image dimensions
    image_info = {item["id"]: (item["width"], item["height"], item["file_name"]) for item in data["images"]}

    # Clear any existing labels in the output directory
    for label_file in os.listdir(output_dir):
        os.remove(os.path.join(output_dir, label_file))

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

        # Append annotation to the label file corresponding to the image
        label_file = os.path.join(output_dir, f"{os.path.splitext(img_file)[0]}.txt")
        with open(label_file, 'a') as lf:
            lf.write(f"{category_id} {x_center:.6f} {y_center:.6f} {w:.6f} {h:.6f}\n")

# Convert train and test annotations
convert_to_yolo(json_file_train, os.path.join(output_labels_dir, "train"))
convert_to_yolo(json_file_test, os.path.join(output_labels_dir, "test"))

print("Conversion completed! Labels are saved in YOLO format.")




