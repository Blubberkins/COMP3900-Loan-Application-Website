from flask import request, jsonify, Blueprint
from firebase_admin import db
import uuid

loan_application_customers = Blueprint('loan_application_customers', __name__)

# ask user for their loan preferences and update them in the database
@loan_application_customers.route("/applyLoan",  methods=['POST'])
def applyLoan():

    # retrieve user loan application data from database
    ref = db.reference("/User/Application")

    # gets user input for loan application details, sorted into various sections
    input_data = request.get_json()

    # loan details
    property_type = input_data.get('property_type')
    loan_purpose = input_data.get('loan_purpose')
    deposit_amount = input_data.get('deposit_amount')
    ir_type = input_data.get('ir_type')
    payment_type = input_data.get('payment_type')
    loan_term = input_data.get('loan_term')

    # user details
    user_title = input_data.get('user_title')
    user_given_name = input_data.get('user_given_name')
    user_middle_name = input_data.get('user_middle_name')
    user_surname = input_data.get('user_surname')
    user_gender = input_data.get('user_gender')
    user_dob = input_data.get('user_dob')
    user_marital = input_data.get('user_marital')
    identification_files = input_data.get('identification_files')

    # income details
    user_income = input_data.get('user_income')
    user_income_status = input_data.get('user_income_status')
    user_additional_income = input_data.get('user_additional_income')
    income_files = input_data.get('income_files')

    # financial details
    user_bank_accounts = input_data.get('user_bank_accounts')
    user_property = input_data.get('user_property')
    user_assets = input_data.get('user_assets')
    financial_files = input_data.get('financial_files')

    # generate a unique ID for the application
    application_id = str(uuid.uuid4())

    # compile preferences into dictionary format
    loanApplication = {
        "loan_details": 
        {
            "property_type": property_type,
            "loan_purpose": loan_purpose,
            "deposit_amount": deposit_amount,
            "ir_type": ir_type,
            "payment_type": payment_type,
            "loan_term": loan_term,
            "application_id": application_id
        },
        "personal_details": 
        {
            "user_title": user_title,
            "user_given_name": user_given_name,
            "user_middle_name": user_middle_name,
            "user_surname": user_surname,
            "user_gender": user_gender,
            "user_dob": user_dob,
            "user_marital": user_marital,
            "identification_files": identification_files
        },
        "income_details": 
        {
            "user_income": user_income,
            "user_income_status": user_income_status,
            "user_additional_income": user_additional_income,
            "income_files": income_files
        },
        "financial_details": 
        {
            "user_bank_accounts": user_bank_accounts,
            "user_property": user_property,
            "user_assets": user_assets,
            "financial_files": financial_files
        }
    }

    # add to the database with the new loan application details
    ref.update(loanApplication)

    # return success message when complete
    return jsonify({'message': 'Success'})

# ask user for their loan preferences and update them in the database
@loan_application_customers.route("/getLoan",  methods=['GET'])
def getLoan():

    # retrieve user loan application data from database
    ref = db.reference("/User/Application")
    # retrieve the data from the reference
    loanData = ref.get()

    # return the data in JSON format
    return jsonify(loanData)