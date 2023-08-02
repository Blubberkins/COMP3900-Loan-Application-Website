from flask import request, jsonify, Blueprint
from firebase_admin import db

loan_application_bank = Blueprint('loan_application_bank', __name__)

@loan_application_bank.route("/approve",  methods=['POST'])
def LAB_approve():
    # gets a reference to the application and pops it
    # a new database of applications that are approved
    approvedRef = db.reference("/CarbonBank/Loan/Approved")
    deniedRef = db.reference("/CarbonBank/Loan/Denied")

    applicationID = request.form.get("application_id")

    newEntry = {
            "loan_id" : applicationID
        }

    for key, entry in approvedRef.get().items():
        if (entry["loan_id"] == applicationID):
            return jsonify({'message': 'Application Already Approved'})
    
    for key, entry in deniedRef.get().items():
        if (entry["loan_id"] == applicationID):
            deleteRef = deniedRef.child(key)
            deleteRef.delete()
    
    # check and remove application from denied database
    approvedRef.push().set(newEntry)
    return jsonify({'message': 'Success'})

@loan_application_bank.route("/deny",  methods=['POST'])
def LAB_deny():
    # gets a reference to the application and stores it in
    # a new database of applications that are denied
    approvedRef = db.reference("/CarbonBank/Loan/Approved")
    deniedRef = db.reference("/CarbonBank/Loan/Denied")

    applicationID = request.form.get("application_id")
    reason = request.form.get("deny_reason")
    
    newEntry = {
            "loan_id" : applicationID,
            "deny_reason" : reason
    }

    for key, entry in deniedRef.get().items():
        if (entry["loan_id"] == applicationID):
            return jsonify({'message': 'Application Already Denied'})
    
    for key, entry in approvedRef.get().items():
        if (entry["loan_id"] == applicationID):
            deleteRef = approvedRef.child(key)
            deleteRef.delete()

    deniedRef.push().set(newEntry)
    return jsonify({'message': 'Success'})

@loan_application_bank.route("/search",  methods=['GET'])
def LAB_search():
    matching = []
    
    #EMPTY STRING IS THE WILDCARD
    property_type = request.form.get('property_type')
    loan_purpose = request.form.get('loan_purpose')
    deposit_amount = request.form.get('deposit_amount')
    ir_type = request.form.get('ir_type')
    payment_type = request.form.get('payment_type')
    loan_term = request.form.get('loan_term')
    application_id = request.form.get('application_id')

    user_title = request.form.get('user_title')
    user_given_name = request.form.get('user_given_name')
    user_middle_name = request.form.get('user_middle_name')
    user_surname = request.form.get('user_surname')
    user_gender = request.form.get('user_gender')
    user_dob = request.form.get('user_dob')
    user_marital = request.form.get('user_marital')

    loan_details = {
        "property_type": property_type,
        "loan_purpose": loan_purpose,
        "deposit_amount": deposit_amount,
        "ir_type": ir_type,
        "payment_type": payment_type,
        "loan_term": loan_term,
        "application_id": application_id
    }
    
    personal_details = {
        "user_title": user_title,
        "user_given_name": user_given_name,
        "user_middle_name": user_middle_name,
        "user_surname": user_surname,
        "user_gender": user_gender,
        "user_dob": user_dob,
        "user_marital": user_marital,
        "identification_files": ""
    }

    applicationRef = db.reference("/User/Application")
    for key, pair in applicationRef.get().items():
        if (dictCompare(pair['loan_details'], loan_details) and
            dictCompare(pair['personal_details'], personal_details)):
                matching.append(pair['loan_details']['application_id'])
    
    if matching:
        return jsonify({'message': "Application Not Found"})
    else:
        return jsonify({'message': matching})

@loan_application_bank.route("/view_awaiting",  methods=['GET'])
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

@loan_application_bank.route("/view_approved",  methods=['GET'])
def LAB_view_approved():
    approvedRef = db.reference("/CarbonBank/Loan/Approved")
    approved = approvedRef.get()
    return jsonify({'message': approved})

@loan_application_bank.route("/view_denied",  methods=['GET'])
def LAB_view_denied():
    deniedRef = db.reference("/CarbonBank/Loan/Approved")
    denied = deniedRef.get()
    return jsonify({'message': denied})

@loan_application_bank.route("/view",  methods=['GET'])
def LAB_view():
    applicationRef = db.reference("/User/Application")

    applicationID = request.form.get("application_id")

    for key, entry in applicationRef.get().items():
        if (entry["loan_details"]["application_id"] == applicationID):
            return jsonify({'message': entry})
    return jsonify({'message': 'Package Not Found'})

@loan_application_bank.route("/view_all",  methods=['GET'])
def LAB_view_all():
    applicationRef = db.reference("/User/Application")
    applications = applicationRef.get()
    return jsonify({'message': applications})
    

# Helpers
# Compares 2 dictionaries to check if the values are the same
# This comparison has a wildcard of empty string ""
def dictCompare(dict1, dict2):
    for item in [(key, dict2[key], value) for key, value in dict1.items()]:
        if (item[1] != "") and item[1] != item[2]:
            return False
    return True