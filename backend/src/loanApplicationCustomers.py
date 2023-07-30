from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import db
import uuid

# getting a reference to the firebase account and database
cred_obj = firebase_admin.credentials.Certificate('carbon-532ae-firebase-adminsdk-493c2-fe662c3d14.json')
default_app = firebase_admin.initialize_app(cred_obj, {'databaseURL': 'https://carbon-532ae-default-rtdb.asia-southeast1.firebasedatabase.app/'})

app = Flask(__name__)

# ask user for their loan preferences and update them in the database
@app.route("/applyLoan",  methods=['POST'])
def applyLoan():

    # retrieve user loan application data from database
    ref = db.reference("/User/Application")

    # gets user input for loan application details, sorted into various sections

    # loan details
    property_type = request.form.get('property_type')
    loan_purpose = request.form.get('loan_purpose')
    deposit_amount = request.form.get('deposit_amount')
    ir_type = request.form.get('ir_type')
    payment_type = request.form.get('payment_type')
    loan_term = request.form.get('loan_term')

    # user details
    user_title = request.form.get('user_title')
    user_given_name = request.form.get('user_given_name')
    user_middle_name = request.form.get('user_middle_name')
    user_surname = request.form.get('user_surname')
    user_gender = request.form.get('user_gender')
    user_dob = request.form.get('user_dob')
    user_marital = request.form.get('user_marital')
    identification_files = request.form.get('identification_files')

    # income details
    user_income = request.form.get('user_income')
    user_income_status = request.form.get('user_income_status')
    user_additional_income = request.form.get('user_additional_income')
    income_files = request.form.get('income_files')

    # financial details
    user_bank_accounts = request.form.get('user_bank_accounts')
    user_property = request.form.get('user_property')
    user_assets = request.form.get('user_assets')
    financial_files = request.form.get('financial_files')

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

    # update the database with the new loan application details
    ref.update(loanApplication)

    # return success message when complete
    return jsonify({'message': 'Success'})

# ask user for their loan preferences and update them in the database
@app.route("/getLoan",  methods=['GET'])
def getLoan():

    # retrieve user loan application data from database
    ref = db.reference("/User/Application")
    # retrieve the data from the reference
    loanData = ref.get()

    # return the data in JSON format
    return jsonify(loanData)