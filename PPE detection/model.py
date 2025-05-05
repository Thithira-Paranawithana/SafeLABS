from ultralytics import YOLO
import cv2

# Paths
data_yaml_path = "C:/Users/REDTECH/Documents/DM2/PPE detection/dataset/data.yaml"  # Dataset YAML file
model_save_path = "ppe_detection.pt"  # Save path for the trained model

# Step 1: Train the Model
def train_model():
    model = YOLO("yolov8n.pt")  # Use YOLOv8 nano pre-trained weights
    model.train(data=data_yaml_path, epochs=50, imgsz=640, batch=16, device="cpu")  # Train model
    model.save(model_save_path)  # Save the trained model

# Step 2: Test the Model
def test_model():
    model = YOLO(model_save_path)  # Load the trained model
    results = model.val(data=data_yaml_path)  # Evaluate on the test set
    print(results)

# Step 3: Real-Time Detection Using Webcam
def real_time_detection():
    model = YOLO(model_save_path)  # Load the trained model

    cap = cv2.VideoCapture(0)  # Open webcam (use index 0 or change for external cameras)
    if not cap.isOpened():
        print("Error: Cannot open webcam.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Cannot read frame from webcam.")
            break

        # Perform detection
        results = model.predict(source=frame, show=True, conf=0.5)  # Show detections on screen

        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# Main Execution
if __name__ == "__main__":
    print("1: Train Model")
    print("2: Test Model")
    print("3: Real-Time Detection")

    choice = input("Enter your choice: ")
    if choice == "1":
        train_model()
    elif choice == "2":
        test_model()
    elif choice == "3":
        real_time_detection()
    else:
        print("Invalid choice.")
