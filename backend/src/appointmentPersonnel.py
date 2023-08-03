import firebase_admin
from firebase_admin import firestore
from datetime import datetime
from google.cloud.firestore_v1.base_query import FieldFilter

from flask import Flask, request, jsonify, Blueprint

db = firestore.client()

appointment_personnel = Blueprint('appointment_personnel', __name__)

@appointment_personnel.route("/view_pending", method = ['GET'])
def AP_view_pending():
    # returns the list of appointments without ids and isOpen is false
    ref = db.collection("Appointments")
    now = datetime.now()

    query = (ref.where(filter = FieldFilter('personnel_id', '==', None))
                .where(filter = FieldFilter('datetime', '>', now))
                .get()
        )

    rList = []
    for item in query:
        rList.append(item.to_dict())
    
    return jsonify({'message': rList})

@appointment_personnel.route("/view_accepted", method = ['GET'])
def AP_view_accepted():
    # given user id
    # returns the list of appointments they have accepted and are upcoming
    ref = db.collection("Appointments")
    now = datetime.now()

    personnel_id = request.form.get('personnel_id')

    query = (ref.where(filter = FieldFilter('personnel_id', '==', personnel_id))
                .where(filter = FieldFilter('datetime', '>', now))
                .get()
    )

    rList = []
    for item in query:
        rList.append(item.to_dict())

    return jsonify({'message': rList}) 

@appointment_personnel.route("/accept", method = ['POST'])
def AP_accept():
    # given user id, and the entry they chose from view
    # updates the database
    ref = db.collection("Appointments")
    now = datetime.now()

    # Fetch from frontend
    customer_id = request.form.get('customer_id')
    personnel_id = request.form.get('personnel_id')
    timeStart = request.form.get('timeStart')
    timeEnd = request.form.get('timeEnd')
    # Fetch from frontend

    query = (ref.where(filter = FieldFilter('customer_id', '==', customer_id))
                .where(filter = FieldFilter('timeStart', '==', timeStart))
                .where(filter = FieldFilter('timeEnd', '==', timeEnd))
                .get()
    )
    
    if (len(query) == 1):
        for item in query:
            ref.document(item.id).update({'isOpen': True, 'personnel_id': personnel_id})
            return jsonify({'message': "Successfully accepted appointment"}) 

    return jsonify({'message': "No such appointment"}) 

@appointment_personnel.route("/deny", method = ['POST'])
def AP_deny():
    # checks the personel id is same then removes
    # the personel id from the database entry
    # returns errors if doesnt match, etc.
    ref = db.collection("Appointments")
    now = datetime.now()

    # Fetch from frontend
    customer_id = request.form.get('customer_id')
    personnel_id = request.form.get('personnel_id')
    timeStart = request.form.get('timeStart')
    timeEnd = request.form.get('timeEnd')
    # Fetch from frontend

    query = (ref.where(filter = FieldFilter('personnel_id', '==', personnel_id))
                .where(filter = FieldFilter('customer_id', '==', customer_id))
                .where(filter = FieldFilter('timeStart', '==', timeStart))
                .where(filter = FieldFilter('timeEnd', '==', timeEnd))
                .get()
    )
    
    if (len(query) == 1):
        for item in query:
            ref.document(item.id).update({'isOpen': True, 'personnel_id': personnel_id})
            return jsonify({'message': "Successfully denied appointment"}) 

    return jsonify({'message': "No such appointment"}) 

@appointment_personnel.route("/avaliability", method = ['POST'])
def AP_avaliability():
    ref = db.collection("Avaliability")

    # Fetch from frontend
    personnel_id = request.form.get('personnel_id')
    location = request.form.get('location')
    monday =    request.form.get('monday')
    tuesday =   request.form.get('tuesday')
    wednesday = request.form.get('wednesday')
    thursday =  request.form.get('thursday')
    friday =    request.form.get('friday')
    # Fetch from frontend

    entry = {"personnel_id" : personnel_id,
             "location" : location,
             "0" : monday,
             "1" : tuesday,
             "2" : wednesday,
             "3" : thursday,
             "4" : friday,
    }

    query = (ref.where(filter = FieldFilter('personnel_id', '==', personnel_id))
                .get()
    )

    if (len(query) == 1):
        for item in query:
            ref.document(item.id).update(entry)
    else:
        ref.add(entry)

    return jsonify({'message': "Successfully updated avaliabilities"})