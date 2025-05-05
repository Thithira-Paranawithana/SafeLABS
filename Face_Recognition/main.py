
import cv2
import pickle  # to save encodings
import face_recognition
import numpy as np
import cvzone
import pyodbc  # Import pyodbc for MSSQL connection
import datetime

# MSSQL database connection configuration
conn = pyodbc.connect(
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=.;"
    "DATABASE=SAFELABS;"
    "UID=admin;"
    "PWD=abc@123;"
)
cursor = conn.cursor()

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

# load encoding file
print("Loading encoding file")
file = open('EncodeFile.p', 'rb')
encodeListWithIds = pickle.load(file)
file.close()
encodeListKnown, imgIds = encodeListWithIds
print(imgIds)
print("Encoding file loaded")

# Dictionary to track recorded attendance to prevent duplicates
attendance_recorded = {}
# Dictionary to store user names for display
user_names = {}

while True:
    success, img = cap.read()
    imgResized = cv2.resize(img, (0, 0), None, 0.25, 0.25)  # resize image
    imgResized = cv2.cvtColor(imgResized, cv2.COLOR_BGR2RGB)  # convert to RGB

    faceCurrentFrame = face_recognition.face_locations(imgResized)  # detect face
    encodeCurrentFrame = face_recognition.face_encodings(imgResized,
                                                         faceCurrentFrame)  # generate encodings for the face in the current frame

    # Threshold for face recognition confidence
    threshold = 0.55

    detected_faces = []  # List to track detected faces in current frame

    for encodedFace, faceloc in zip(encodeCurrentFrame, faceCurrentFrame):
        # compare the current frame's face encodings with saved encodings
        matches = face_recognition.compare_faces(encodeListKnown, encodedFace)

        # get the distances between compared faces
        faceDistance = face_recognition.face_distance(encodeListKnown, encodedFace)
        print("faceDistance", faceDistance)

        matchIndex = np.argmin(faceDistance)  # get minimum distance face index

        if matches[matchIndex] and faceDistance[matchIndex] < threshold:
            matchedId = imgIds[matchIndex]  # matched img ID
            detected_faces.append(matchedId)

            # If we already have the user name, use it
            if matchedId in user_names:
                label = f"Name: {user_names[matchedId]}"
            else:
                # Otherwise, show ID until we fetch the name
                label = f"ID: {matchedId}"

                # Retrieve user information from the MSSQL database
                query = """
                    SELECT u.*
                    FROM tblImageId AS i
                    JOIN tblUser AS u ON i.userId = u.Id
                    WHERE i.imageId = ?
                """
                cursor.execute(query, (matchedId,))
                userInfo = cursor.fetchone()

                if userInfo:
                    print("User Information:", userInfo)
                    # Store the user's name for future reference
                    user_names[matchedId] = userInfo.firstName if hasattr(userInfo, 'firstName') else userInfo[
                        2]  # Assuming firstName is at index 2
                    label = f"Name: {user_names[matchedId]}"

                    # Check if attendance hasn't been recorded today for this user
                    current_date = datetime.datetime.now().date()
                    userId = userInfo[0]  # Assuming user ID is at index 0

                    # Check if user already has attendance today
                    check_query = """
                        SELECT COUNT(*) FROM tblAttendance 
                        WHERE userId = ? AND CONVERT(date, date) = CONVERT(date, ?)
                    """
                    cursor.execute(check_query, (userId, current_date))
                    already_recorded = cursor.fetchone()[0] > 0

                    # Also check our local tracking dictionary
                    already_recorded = already_recorded or (
                                userId in attendance_recorded and attendance_recorded[userId].date() == current_date)

                    if not already_recorded:
                        # Get current date and time for attendance record
                        check_in_time = datetime.datetime.now().time()
                        insert_date = datetime.datetime.now()  # current date and time

                        # Insert attendance record into tblAttendance
                        insert_query = """
                            INSERT INTO tblAttendance (userId, date, checkInTime, insertDate, insertBy, isActive)
                            VALUES (?, ?, ?, ?, ?, ?)
                        """
                        cursor.execute(insert_query, (userId, current_date, check_in_time, insert_date, 1, 1))
                        conn.commit()  # Commit the transaction to save the record

                        # Mark attendance as recorded for this user today
                        attendance_recorded[userId] = datetime.datetime.now()
                        print(f"Attendance recorded for {user_names[matchedId]}")
        else:
            label = "Unknown"

        # create boundary rectangle
        y1, x2, y2, x1 = faceloc
        y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
        bbox = x1, y1, x2 - x1, y2 - y1
        img = cvzone.cornerRect(img, bbox, rt=0)  # rectangle thickness=0

        # Display the name or ID near the rectangle on the video frame
        cv2.putText(
            img,
            label,  # Text to display
            (x1, y1 - 10),  # Position (above the rectangle)
            cv2.FONT_HERSHEY_SIMPLEX,  # Font type
            0.8,  # Font scale (size)
            (0, 255, 0) if label != "Unknown" else (0, 0, 255),  # Color: green for known, red for unknown
            2  # Thickness of the text
        )

    cv2.imshow("Face Recognition", img)
    key = cv2.waitKey(1)
    if key == 27:  # ESC key to quit
        break

# Close the database connection and release resources
conn.close()
cap.release()
cv2.destroyAllWindows()