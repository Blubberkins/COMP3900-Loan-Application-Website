import firebase_admin
from firebase_admin import firestore
from datetime import datetime
from google.cloud.firestore_v1.base_query import FieldFilter

from flask import Flask, request, jsonify, Blueprint

db = firestore.client()

appointment_customer = Blueprint('appointment_customer', __name__)

@appointment_customer.route("/view_avaliable", method = ['GET'])
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

@appointment_customer.route("/view_my", method = ['GET'])
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
        return jsonify({'message': "No appointments"})

@appointment_customer.route("/view_request", method = ['POST'])
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
        return jsonify({'message': "Already have reached the max of 3 appointments"})
    else:
        ref.add(entry)
        return jsonify({'message': "Added new appointment"})

@appointment_customer.route("/cancel", method = ['POST'])
def AC_cancel():
    # cancel appointment
    # - customer id, timeslot
    # returns ok if had appointment in slot
    # otherwise returns fail if no such appointment
    ref = db.collection("Appointments")

    timeStart = request.form.get('timeStart')
    timeEnd = request.form.get('timeEnd')
    customer_id = request.form.get('customer_id')
    
    query = (ref.where(filter = FieldFilter('customer_id', '==', customer_id))
                .where(filter = FieldFilter('timeStart', '==', timeStart))
                .where(filter = FieldFilter('timeEnd', '==', timeEnd))
                .get()        
    )
    
    for item in query:
        ref.document(item.id).delete()
        return jsonify({'message': "Appointment cancelled"})
    else:
        return jsonify({'message': "Appointment not found"})
