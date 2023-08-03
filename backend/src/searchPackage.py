from flask import request, jsonify, Blueprint
import loan_package
import json
from firebase_admin import db

search_package = Blueprint('search_package', __name__)

# returns list of packages sorted by interest rate, excluding packages based on their LVRs


@search_package.route("/search",  methods=['POST'])
def searchPackage():

    # retrieve package list as json response
    packages_json = loan_package.LP_view_all().get_json()

    # create list of packages to populate
    package_list = []

    # iterate through json response and place loan packages in the package list
    for message, package_id in packages_json.items():
        for package in package_id.values():
            package_list.append(package)

    # get user input for estimated property value and borrowing amount
    estimated_value = float(request.get_json().get('estimated_value'))
    borrowing_amount = float(request.get_json().get('borrowing_amount'))

    # calculate and store loan-to-value ratio (LVR)
    lvr = borrowing_amount / estimated_value

    # exclude loan packages based on their maximum LVR
    lvrList = [p for p in package_list if p['lvr'] >= lvr]

    # sort loan packages by their interest rate (ascending)
    irList = sorted(lvrList, key=lambda x: x['interest_rate'])

    return jsonify(irList)

# returns list of packages sorted by the number of user loan preferences they satisfy


@search_package.route("/recommend",  methods=['POST'])
def recommendPackage():

    # retrieve package list as json response
    packages_json = loan_package.LP_view_all().get_json()

    # create list of packages to populate
    package_list = []

    # iterate through json response and place loan packages in the package list
    for message, package_id in packages_json.items():
        for package in package_id.values():
            package_list.append(package)

    # retrieve user loan preferences from database
    ref = db.reference("/User/Preferences")
    preferences = ref.get()

    # sort loan packages by the number of preferences they satisfy (descending)
    # -> specifically, by the length of the intersection between the loan preferences and the keys of each loan package dictionary
    preferenceList = sorted(package_list, key=lambda p: len(
        set(preferences) & set(p.keys())), reverse=True)

    return jsonify(preferenceList)
