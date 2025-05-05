# import cv2
# import face_recognition
# import pickle
# import os
#
# folderPath = 'Images'
# pathList = os.listdir(folderPath)
# print(pathList)
# imgList = []    # array of images
# imgIds = []     # array of image Ids
# for path in pathList:
#     imgList.append(cv2.imread(os.path.join(folderPath, path)))
#     # print(path)
#     # print(os.path.splitext(path)[0])    # remove .jpg from Id
#     imgIds.append(os.path.splitext(path)[0]) # remove .jpg from Id and append to list
#
#     fileName = os.path.join(folderPath, path)
#
# # print(len(imgList))
# print(imgIds)
#
# # get the encodings of the images
# def findEncodings(imagesList):
#     encodeList = []     # list of encodings
#     for img in imagesList:
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # convert to RGB
#         encode = face_recognition.face_encodings(img)[0] # get encodings
#         # The [0] index is used to get the encoding of the first detected face in each image.
#         encodeList.append(encode)
#
#     return encodeList
#
# # # Below method uses CNN model to detect faces instead of HOG model
# # def findEncodings(imagesList):
# #     encodeList = []  # list of encodings
# #     for img in imagesList:
# #         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # convert to RGB
# #         # Detect faces with the CNN model
# #         face_locations = face_recognition.face_locations(img, model='cnn')
# #
# #         # Get encodings for each detected face
# #         encodings = face_recognition.face_encodings(img, face_locations)
# #
# #         # Check if any face was detected and encoded, then add the first encoding
# #         if encodings:
# #             encodeList.append(encodings[0])
# #
# #     return encodeList
#
#
# print("Encoding begins...")
# encodeListKnown = findEncodings(imgList)    # call the function (pass our images there)
# print(encodeListKnown)   # print the generated encodings
# encodeListWithIds = [encodeListKnown, imgIds]     # store encodings with image Id
# print("Encoding finished")
#
# # save encodings to a pickle file
# file = open("EncodeFile.p", 'wb')
# pickle.dump(encodeListWithIds, file)
# file.close()
# print("File saved")


####################################

import cv2
import face_recognition
import pickle
import os

folderPath = 'Images'
pathList = os.listdir(folderPath)
print("Images in folder:", pathList)

imgList = []  # Array to hold new images that need encoding
imgIds = []  # Array to hold new image IDs
existing_ids = set()  # Set of image IDs already encoded (if pickle exists)

# Check if the encoding file already exists
pickle_file = "EncodeFile.p"
if os.path.exists(pickle_file):
    # Load existing encodings and IDs from the pickle file
    with open(pickle_file, "rb") as file:
        encodeListWithIds = pickle.load(file)
        encodeListKnown, imgIdsKnown = encodeListWithIds
        existing_ids = set(imgIdsKnown)  # Convert to set for faster lookups
        print("Loaded existing encodings from EncodeFile.p")
else:
    # Initialize empty lists if no pickle file exists
    encodeListKnown = []
    imgIdsKnown = []
    print("No existing encoding file found. Creating new file.")

# Process images and add only those that aren't already encoded
for path in pathList:
    img_id = os.path.splitext(path)[0]  # Image ID (filename without extension)
    if img_id not in existing_ids:
        imgList.append(cv2.imread(os.path.join(folderPath, path)))
        imgIds.append(img_id)
    else:
        print(f"Image {img_id} already encoded, skipping.")


# Function to find encodings for images
def findEncodings(imagesList):
    encodeList = []  # List of encodings
    for img in imagesList:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB
        encodings = face_recognition.face_encodings(img)  # Get encodings
        if encodings:  # Check if encoding was found
            encodeList.append(encodings[0])  # Append first encoding if available
        else:
            print("No face found in an image, skipping.")
    return encodeList


# Only encode if there are new images to process
if imgList:
    print("Encoding new images...")
    new_encodings = findEncodings(imgList)
    print("Encoding complete for new images.")

    # Append new encodings and IDs to the known lists
    encodeListKnown.extend(new_encodings)
    imgIdsKnown.extend(imgIds)

    # Save updated encodings to the pickle file
    with open(pickle_file, 'wb') as file:
        pickle.dump([encodeListKnown, imgIdsKnown], file)
    print("Updated encodings saved to EncodeFile.p")
else:
    print("No new images to encode. Pickle file remains unchanged.")

print("Process complete.")
