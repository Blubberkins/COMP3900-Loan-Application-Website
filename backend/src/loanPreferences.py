from flask import request, jsonify, Blueprint
from firebase_admin import db

loan_preferences = Blueprint('loan_preferences', __name__)

# ask user for their loan preferences and update them in the database
@loan_preferences.route("/preferences",  methods=['POST'])
def loanPreferences():

    # retrieve user loan preferences from database
    ref = db.reference("/User/Preferences")
    
    # get user input for loan purpose (live-in/investment), ir type (fixed/variable),
    # ability to make additional payments (Y/N), and access to redraws (Y/N)
    input_data = request.get_json()

    loan_purpose = input_data.get('loan_purpose')
    ir_type = input_data.get('ir_type')
    additional_payments = input_data.get('additional_payments')
    redraws = input_data.get('redraws')

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