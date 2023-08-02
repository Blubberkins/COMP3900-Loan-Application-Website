from flask import Flask, request
from json import dumps, loads
from flask_cors import CORS

import config
from calculators import borrow_calc, repay_calc, extra_payment

APP = Flask(__name__)
CORS(APP)


@APP.route("/calculators/repayment", methods=['POST'])
def calculators_repay():
    payload = request.get_json()
    principal = payload['principal']
    interest = payload['interest']
    duration = payload['interest']
    frequency = payload['frequency']
    type = payload['type']
    result = repay_calc(principal, interest, duration, frequency, type)
    return dumps(result)


@APP.route("/calculators/extra", methods=['POST'])
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


@APP.route("/calculators/borrow", methods=['POST'])
def calculators_borrow():
    payload = request.get_json()
    joint = int(payload['numPeopleApply'][0])
    numPeopleSupport = int(payload['numPeopleSupport'])
    propertyType = payload['propertyType']
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
    APP.run(port=config.port)
