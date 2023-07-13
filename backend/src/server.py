from flask import Flask, request
from json import dumps, loads

from src import config
from src.calculators import borrow_calc, repay_calc, extra_payment

APP = Flask(__name__)

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
    result = extra_payment(principal, interest, duration, frequency, type, extra)
    return dumps(result)

@APP.route("/calculators/borrow", methods=['POST'])
def calculators_borrow():
    payload = request.get_json()
    joint = payload['joint']
    no_dependents = payload['no_dependents']
    income = payload['income']
    rental_income = payload['rental_income']
    other_income = payload['other_income']
    living_expenses = payload['living_expenses']
    loans = payload['loans']
    credit_limit = payload['credit_limit']
    interest = payload['interest']
    duration = payload['duration']
    result = borrow_calc(joint, no_dependents, income, rental_income, other_income, 
                         living_expenses, loans, credit_limit, interest, duration)
    return dumps(result)

if __name__ == "__main__":
    APP.run(port = config.port)