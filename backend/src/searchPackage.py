from flask import request, jsonify, Blueprint
import loan_package
import json
from firebase_admin import db

search_package = Blueprint('search_package', __name__)

# returns list of packages sorted by interest rate, excluding packages based on their LVRs


@search_package.route("/search",  methods=['POST'])
def searchPackage():

    # retrieve package list
    packages = json.dumps(loan_package.LP_view_all())

    # get user input for estimated property value and borrowing amount
    estimated_value = float(request.get_json().get('estimated_value'))
    borrowing_amount = float(request.get_json().get('borrowing_amount'))

    # calculate and store loan-to-value ratio (LVR)
    lvr = borrowing_amount / estimated_value

    # exclude loan packages based on their maximum LVR
    lvrList = [p for p in packages if p['max_lvr'] >= lvr]

    # sort loan packages by their interest rate (ascending)
    irList = sorted(lvrList, key=lambda x: x['interest_rate'])

    return jsonify(irList)

# returns list of packages sorted by the number of user loan preferences they satisfy


@search_package.route("/recommend",  methods=['POST'])
def recommendPackage():

    # retrieve package list
    packages = json.dumps(loan_package.LP_view_all())

    # retrieve user loan preferences from database
    ref = db.reference("/User/Preferences")
    preferences = ref.get()

    # sort loan packages by the number of preferences they satisfy (descending)
    # -> specifically, by the length of the intersection between the loan preferences and the keys of each loan package dictionary
    preferenceList = sorted(packages, key=lambda p: len(
        set(preferences) & set(p.keys())), reverse=True)

    return jsonify(preferenceList)
