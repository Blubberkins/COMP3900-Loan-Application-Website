from flask import Flask, request, jsonify
from packages import Packages # placeholder for retrieving package info file

app = Flask(__name__)

@app.route("/search",  methods=['POST'])
def searchPackage():

    # retrieve package list
    packages = Packages.getList() # placeholder for retrieving package info function
    
    # get user input for estimated property value and borrowing amount
    estimated_value = float(request.form.get('estimated_value'))
    borrowing_amount = float(request.form.get('borrowing_amount'))

    # calculate and store loan-to-value ratio (LVR)
    lvr = borrowing_amount / estimated_value

    # exclude loan packages based on their maximum LVR
    lvrList = [p for p in packages if p['max_lvr'] >= lvr]

    # sort loan packages by their interest rate (ascending)
    irList = sorted(lvrList, key=lambda x: x['interest_rate'])

    return jsonify(irList)