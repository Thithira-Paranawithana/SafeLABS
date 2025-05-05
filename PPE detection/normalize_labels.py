import os
from tqdm import tqdm
import cv2  # OpenCV for image processing

# Paths to images and labels
label_dir = "C:/Users/REDTECH/Documents/DM2/PPE detection/dataset/labels"  # Example: dataset/labels
image_dir = "C:/Users/REDTECH/Documents/DM2/PPE detection/dataset/images"  # Example: dataset/images
convert_to_jpg = True  # Set to False if you don't want to convert images to .jpg


def normalize_and_validate_labels():
    for split in ['train', 'test']:  # Process both train and test splits
        label_path = os.path.join(label_dir, split)
        image_path = os.path.join(image_dir, split)

        for label_file in tqdm(os.listdir(label_path), desc=f"Processing {split} labels"):
            label_file_path = os.path.join(label_path, label_file)
            image_file = label_file.replace(".txt", ".png")  # Original file extension
            image_file_path = os.path.join(image_path, image_file)

            # Convert .png to .jpg if enabled
            if convert_to_jpg:
                new_image_file = label_file.replace(".txt", ".jpg")
                new_image_file_path = os.path.join(image_path, new_image_file)

                # Convert image and update file path
                img = cv2.imread(image_file_path)
                if img is None:
                    print(f"Warning: Image {image_file_path} not found or invalid.")
                    continue
                cv2.imwrite(new_image_file_path, img, [cv2.IMWRITE_JPEG_QUALITY, 95])
                image_file_path = new_image_file_path  # Update path to .jpg
                os.remove(image_file_path.replace(".jpg", ".png"))  # Optionally remove .png file

            # Read image dimensions
            try:
                img = cv2.imread(image_file_path)
                if img is None:
                    print(f"Warning: Image {image_file_path} not found or invalid.")
                    continue
                img_height, img_width = img.shape[:2]
            except Exception as e:
                print(f"Error reading image {image_file_path}: {e}")
                continue

            # Read and process label file
            new_lines = []
            with open(label_file_path, "r") as f:
                for line in f:
                    parts = line.strip().split()
                    if len(parts) != 5:
                        print(f"Invalid label format in {label_file}: {line}")
                        continue

                    # Parse label components
                    class_id, x_center, y_center, width, height = map(float, parts)

                    # Normalize coordinates
                    x_center /= img_width
                    y_center /= img_height
                    width /= img_width
                    height /= img_height

                    # Ensure coordinates are within bounds
                    x_center = min(max(x_center, 0), 1)
                    y_center = min(max(y_center, 0), 1)
                    width = min(max(width, 0), 1)
                    height = min(max(height, 0), 1)

                    # Skip invalid boxes
                    if width <= 0 or height <= 0:
                        print(f"Skipping invalid bounding box in {label_file}: {line}")
                        continue

                    new_lines.append(f"{int(class_id)} {x_center} {y_center} {width} {height}\n")

            # Write normalized labels back to file
            with open(label_file_path, "w") as f:
                f.writelines(new_lines)


if __name__ == "__main__":
    normalize_and_validate_labels()
