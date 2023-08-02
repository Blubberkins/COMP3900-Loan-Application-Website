from flask import Flask, request
from json import dumps, loads
from flask_cors import CORS
import firebase_admin

import config
from calculators import borrow_calc, repay_calc, extra_payment

# obtaining firebase credentials and initializing firebase database
cred_obj = firebase_admin.credentials.Certificate('carbon-532ae-firebase-adminsdk-493c2-fe662c3d14.json')
default_app = firebase_admin.initialize_app(cred_obj, {'databaseURL': 'https://carbon-532ae-default-rtdb.asia-southeast1.firebasedatabase.app/'})

# import all backend functions except calculators (functions for calc are integrated into app.py)
from loan_package import loan_package
from loanApplicationBank import loan_application_bank
from loanApplicationCustomers import loan_application_customers
from loanPreferences import loan_preferences
from searchPackage import search_package

app = Flask(__name__)
CORS(app)

# register backend functions as blueprints
app.register_blueprint(loan_package)
app.register_blueprint(loan_application_bank)
app.register_blueprint(loan_application_customers)
app.register_blueprint(loan_preferences)
app.register_blueprint(search_package)

@app.route("/calculators/repayment", methods=['POST'])
def calculators_repay():
    payload = request.get_json()
    principal = payload['principal']
    interest = payload['interest']
    duration = payload['interest']
    frequency = payload['frequency']
    type = payload['type']
    result = repay_calc(principal, interest, duration, frequency, type)
    return dumps(result)


@app.route("/calculators/extra", methods=['POST'])
def calculators_extra():
    payload = request.get_json()
    principal = payload['principal']
    interest = payload['interest']
    duration = payload['interest']
    frequency = payload['frequency']
    type = payload['type']
    extra = payload['extra']
    result = extra_payment(principal, interest, duration,
                           frequency, type, extra)
    return dumps(result)


@app.route("/calculators/borrow", methods=['POST'])
def calculators_borrow():
    payload = request.get_json()
    joint = int(payload['numPeopleApply'][0])
    numPeopleSupport = int(payload['numPeopleSupport'])
    propertyType = payload['propertyType'][0]
    income = int(payload['income'])
    incomePeriod = payload['incomePeriod']
    expensePeriod = payload['expensePeriod']
    loanPeriod = payload['loanPeriod']
    living_expenses = int(payload['expense'])
    loans = int(payload['loan'])
    credit_limit = int(payload['credit'])
    result = borrow_calc(joint, numPeopleSupport, income, living_expenses, loans, credit_limit, propertyType, incomePeriod, expensePeriod, loanPeriod)
    return dumps(result)


if __name__ == "__main__":
    app.run(port=config.port)
