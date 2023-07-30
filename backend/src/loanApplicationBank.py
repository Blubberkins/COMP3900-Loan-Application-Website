from flask import Flask, request, jsonify
import json
import firebase_admin
from firebase_admin import db

# getting a reference to the firebase account and database
cred_obj = firebase_admin.credentials.Certificate('carbon-532ae-firebase-adminsdk-493c2-fe662c3d14.json')
default_app = firebase_admin.initialize_app(cred_obj, {'databaseURL': 'https://carbon-532ae-default-rtdb.asia-southeast1.firebasedatabase.app/'})

app = Flask(__name__)

@app.route("/approve",  methods=['POST'])
def LAB_approve():
    # gets a reference to the application and pops it
    # a new database of applications that are approved
    approvedRef = db.reference("/CarbonBank/Loan/Approved")

    applicationID = request.form.get("application_id")

    newEntry = {
            "loan_id" : applicationID
        }

    for key, entry in approvedRef.get().items():
        if (entry["loan_id"] == applicationID):
            return jsonify({'message': 'Application Already Approved'})
    
    approvedRef.push().set(newEntry)
    return jsonify({'message': 'Success'})

@app.route("/deny",  methods=['POST'])
def LAB_deny():
    # gets a reference to the application and stores it in
    # a new database of applications that are denied
    deniedRef = db.reference("/CarbonBank/Loan/Denied")

    applicationID = request.form.get("application_id")
    reason = request.form.get("deny_reason")
    
    newEntry = {
            "loan_id" : applicationID
            "deny_reason" : reason
        }

    for key, entry in deniedRef.get().items():
        if (entry["loan_id"] == applicationID):
            return jsonify({'message': 'Application Already Denied'})
    
    deniedRef.push().set(newEntry)
    return jsonify({'message': 'Success'})

@app.route("/search",  methods=['GET'])
def LAB_search():
    matching = []


    return



@app.route("/view_awaiting",  methods=['GET'])
def LAB_view_awaiting():
    done = []
    awaiting = []

    approvedRef = db.reference("/CarbonBank/Loan/Approved")
    for key, entry in approvedRef.get().items():
        done.append(entry["application_id"])

    deniedRef = db.reference("/CarbonBank/Loan/Denied")
    for key, entry in deniedRef.get().items():
        done.append(entry["application_id"])

    applicationRef = db.reference("/User/Application")
    for key, entry in  applicationRef.get().items():
        if entry["loan_details"]["application_id"] not in done:
            awaiting.append(entry["loan_details"]["application_id"])
    
    return jsonify({'message': awaiting})

@app.route("/view_approved",  methods=['GET'])
def LAB_view_approved():
    approvedRef = db.reference("/CarbonBank/Loan/Approved")
    approved = approvedRef.get()
    return jsonify({'message': approved})

@app.route("/view_denied",  methods=['GET'])
def LAB_view_denied():
    deniedRef = db.reference("/CarbonBank/Loan/Approved")
    denied = deniedRef.get()
    return jsonify({'message': denied})

@app.route("/view",  methods=['GET'])
def LAB_view():
    applicationRef = db.reference("/User/Application")

    applicationID = request.form.get("application_id")

    for key, entry in applicationRef.get().items():
        if (entry["loan_details"]["application_id"] == applicationID):
            return jsonify({'message': application})
    return jsonify({'message': 'Package Not Found'})

@app.route("/view_all",  methods=['GET'])
def LAB_view_all():
    applicationRef = db.reference("/User/Application")
        applications = applicationRef.get()
        return jsonify({'message': applications})
    