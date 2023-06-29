from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import db

# getting a reference to the firebase account and database
cred_obj = firebase_admin.credentials.Certificate('....path to file')
default_app = firebase_admin.initialize_app(cred_obj, {'databaseURL': databaseURL})


app = Flask(__name__)

# ask user for their loan preferences and update them in the database
@app.route("/preferences",  methods=['POST'])
def loanPreferences():

    # retrieve user loan preferences from database
    ref = db.reference("/User/Preferences")
    
    # get user input for loan purpose (live-in/investment), ir type (fixed/variable),
    # ability to make additional payments (Y/N), and access to redraws (Y/N)
    loan_purpose = request.form.get('loan_purpose')
    ir_type = request.form.get('ir_type')
    additional_payments = request.form.get('additional_payments')
    redraws = request.form.get('redraws')

    # compile preferences into dictionary format
    newPreferences = {
        "loan_purpose": loan_purpose,
        "ir_type": ir_type,
        "additional_payments": additional_payments,
        "redraws": redraws,
    }

    # update the database with the new loan preferences
    ref.update(newPreferences)

    # return success message when complete
    return jsonify({'message': 'Success'})