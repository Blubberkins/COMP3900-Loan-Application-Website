import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
from google.cloud.firestore_v1.base_query import FieldFilter

from flask import Flask, request, jsonify

# Fetch the service account key JSON file contents
# i used my own firebase for testing but will need to get the key for the group one
cred = credentials.Certificate('secret key.json')
# Initialize the app with a service account, granting admin privileges
# should change permissions for the thingo but idk how
firebase_admin.initialize_app(cred, {'databaseURL': "https://comp3900-e4af5-default-rtdb.asia-southeast1.firebasedatabase.app/"})
db = firestore.client()

app = Flask(__name__)

@app.route("/view_avaliable", method = ['GET'])
def AC_view_avaliable():
    # view avaliable slots
    # returns list of all avaliable upcoming slots
    ref = db.collection("Avaliability")

    date = request.form.get('date')

    searchStr = str(date.weekday())

    avaliable = [False] * 9
    for item in ref.get():
        for i in range(0, 9):
            if (item.to_dict()[searchStr][i]):
                avaliable[i] = True

    return jsonify({'message': avaliable})

@app.route("/view_my", method = ['GET'])
def AC_view_my():
    # view my appointments
    # - customer id
    # returns the list of all upcoming appointments for customer
    ref = db.collection("Appointments")

    customer_id = request.form.get('customer_id')

    query = (ref.where(filter = FieldFilter('customer_id', '==', customer_id))
                .where(filter = FieldFilter('completed', '==', False))
                .where(filter = FieldFilter('personnel_id', '!=', None))
                .get()
    )

    if len(query) == 0:
        for item in query:
            return jsonify({'message': item.to_dict()})
    else:
        return jsonify({'message': "No Appointments"})

@app.route("/view_request", method = ['POST'])
def AC_request():
    # request new appointment
    # - customer id, personnel id, datetime 30 min slot
    # returns ok if has space in that timeslot (up to 5 per slot)
    # returns no if customer already has any appointment
    ref = db.collection("Appointments")

    timeStart = request.form.get('timeStart')
    timeEnd = request.form.get('timeEnd')
    location = request.form.get('location')
    contact = request.form.get('contact')
    customer_name = request.form.get('customer_name')
    customer_id = request.form.get('customer_id')
    
    now = datetime.now()

    entry = {
        "timeStart": timeStart,
        "timeEnd": timeEnd,
        "isOpen": False,
        "location": location,
        "contact": contact,
        "name": customer_name,
        "personnel_id": None,
        "customer_id": customer_id
    }
    
    query = (ref.where(filter = FieldFilter('customer_id', '==', customer_id))
                .where(filter = FieldFilter('timeEnd', '>', now))
                .get()
    )

    if (len(query) >= 3):
        return("Already have multiple appointments")
    else:
        ref.add(entry)
        return("Added new appointment")

@app.route("/cancel", method = ['POST'])
def AC_cancel():
    # cancel appointment
    # - customer id, timeslot
    # returns ok if had appointment in slot
    # otherwise returns fail if no such appointment
    ref = db.collection("Appointments")
    
    customer_id = request.form.get('customer_id')
    
    now = datetime.now()
    
    query = (ref.where(filter = FieldFilter('customer_id', '==', customer_id))
                .where(filter = FieldFilter('timeEnd', '>', now))
                .get()        
    )
    
    for item in query:
        ref.document(item.id).delete()
        return(True)
    else:
        return(None)
