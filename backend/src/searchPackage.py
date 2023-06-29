from flask import Flask, request, jsonify
import loan_package
import json
import firebase_admin
from firebase_admin import db

# getting a reference to the firebase account and database
cred_obj = firebase_admin.credentials.Certificate('....path to file')
default_app = firebase_admin.initialize_app(cred_obj, {'databaseURL': databaseURL})

app = Flask(__name__)

# returns list of packages sorted by interest rate, excluding packages based on their LVRs
@app.route("/search",  methods=['POST'])
def searchPackage():

    # retrieve package list
    packages = json.dumps(loan_package.LP_view_all())
    
    # get user input for estimated property value and borrowing amount
    estimated_value = float(request.form.get('estimated_value'))
    borrowing_amount = float(request.form.get('borrowing_amount'))

    # calculate and store loan-to-value ratio (LVR)
    lvr = borrowing_amount / estimated_value

    # exclude loan packages based on their maximum LVR
    lvrList = [p for p in packages if p['max_lvr'] >= lvr]

    # sort loan packages by their interest rate (ascending)
    irList = sorted(lvrList, key=lambda x: x['interest_rate'])

    return jsonify(irList)

# returns list of packages sorted by the number of user loan preferences they satisfy
@app.route("/recommend",  methods=['POST'])
def recommendPackage():

    # retrieve package list
    packages = json.dumps(loan_package.LP_view_all())
    
    # retrieve user loan preferences from database
    ref = db.reference("/User/Preferences")
    preferences = ref.get()

    # sort loan packages by the number of preferences they satisfy (descending)
    # -> specifically, by the length of the intersection between the loan preferences and the keys of each loan package dictionary
    preferenceList = sorted(packages, key=lambda p: len(set(preferences) & set(p.keys())), reverse=True)

    return jsonify(preferenceList)