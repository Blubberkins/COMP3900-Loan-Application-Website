from flask import Flask, request
from json import dumps, loads

from src import config
from src.calculators import borrow_calc, repay_calc, extra_payment

APP = Flask(__name__)

@APP.route("/calculators/borrowingpower", methods=['POST'])
def calculators_borrow():
    payload = request.get_json()
    principal = payload['principal']
    interest = payload['interest']
    duration = payload['interest']
    frequency = payload['frequency']
    type = payload['type']
    result = repay_calc(principal, interest, duration, frequency, type)
    return dumps(result)

if __name__ == "__main__":
    APP.run(port = config.port)