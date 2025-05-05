import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred,{
    'databaseURL': "https://safelabs-be138-default-rtdb.firebaseio.com/"
})

ref = db.reference('Users')   # reference path of users in the database

data = {    # key-value pairs to store data.
    "2_a": # key (the imageID)
        {
            "name": "Leonardo DeCapprio",
            "age": 45,
            "last_attendance": "2024-11-10 23:00:00"
        },
    "3_a": # key (the imageID)
        {
            "name": "Will Smith",
            "age": 56,
            "last_attendance": "2024-11-10 23:00:00"
        },
    "1_b": # key (the imageID)
        {
            "name": "Thithira Paranawithana",
            "age": 24,
            "last_attendance": "2024-11-10 23:00:00"
        },
    "1_a": # key (the imageID)
        {
            "name": "Thithira Paranawithana",
            "age": 24,
            "last_attendance": "2024-11-10 23:00:00"
        },
}

# create sub directories and add data to the database
for key, value in data.items():
    ref.child(key).set(value)