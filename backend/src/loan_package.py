import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from flask import Flask, request, jsonify

# Fetch the service account key JSON file contents
# i used my own firebase for testing but will need to get the key for the group one
cred = credentials.Certificate('secret key.json')
# Initialize the app with a service account, granting admin privileges
# should change permissions for the thingo but idk how
firebase_admin.initialize_app(cred, {'databaseURL': "https://comp3900-e4af5-default-rtdb.asia-southeast1.firebasedatabase.app/"})

app = Flask(__name__)

# Main Functions
@app.route("/new", method = ['POST'])
def LP_new():
    ref = LP_set_ref()
    loanInfo = LP_get()
    if (not LP_sanity(loanInfo)):
        return jsonify({'message': 'Failed Sanity Check'})

    ref.push().set(loanInfo)
    return jsonify({'message': 'Success'})

@app.route("/edit", method = ['POST'])
def LP_edit():
    ref = LP_set_ref()
    loanName = request.form.get("loan_name")
    loanInfo = LP_get()

    if (not LP_sanity(loanInfo)):
        return jsonify({'message': 'Failed Sanity Check'})
    
    loans = ref.get()
    found = False

    for key, info in loans.items():
        if (info["loan_name"] == loanName):
            ref.child(key).update(loanInfo)
            found = True
    
    if (found):
        return jsonify({'message': 'Success'})
    else:
        return jsonify({'message': 'Package Not Found'})

@app.route("/view", method = ['GET'])
def LP_view():
    ref = LP_set_ref()
    loanName = request.form.get("loan_name")

    loans = ref.get()
    for key, info in loans.items():
        if (info["loan_name"] == loanName):
            return jsonify({'message': info})
    return jsonify({'message': 'Package Not Found'})

@app.route("/view_all", method = ['GET'])
def LP_view_all():
    ref = LP_set_ref()
    loans = ref.get()
    return jsonify({'message': loans})

# Helpers

def LP_set_ref():
    return db.reference("/CarbonBank/Loan_Packages")

def LP_get():
    return {
        "loan_name" : request.form.get("loan_name"),
        "lvr" : request.form.get("lvr"),
        "loan_purpose" : request.form.get("loan_purpose"),
        "interest_rate" : request.form.get("interest_rate"),
        "ir_type" : request.form.get("ir_type"),
        "additional_payments" : request.form.get("additional_payments"),
        "redraws" : request.form.get("redraws")
    }

@app.route("/repayment", method = ['Get'])
def LP_repayment():
    ref = LP_set_ref()
    loans = ref.get()

    loanName = request.form.get("loan_name")
    repayPeriod = request.form.get("loan_time")
    repayPeriod = request.form.get("loan_period")
    loanAmount = request.form.get("loan_amount")

    loans = ref.get()
    for key, info in loans.items():
        if (info["loan_name"] == loanName):
            rate = info["interest_rate"] 
    

    repay = 0

def LP_sanity(loanInfo):
    # ensure the loanInfo has all the fields correct
    if not isinstance(loanInfo['loan_name'], str):
        return False
    if not isinstance(loanInfo['lvr'], float):
        return False
    if not isinstance(loanInfo['loan_purpose'], str):
        return False
    if not isinstance(loanInfo['ir_type'], str):
        return False
    if not isinstance(loanInfo['additional_payments'], bool):
        return False
    if not isinstance(loanInfo['redraws'], bool):
        return False
    
    ref = LP_set_ref()
    loans = ref.get()
    # ensure that the database is not empty before first insertion
    if loans == None:
        return True
    # ensure that loans cannot have the same name
    for key, info in loans.items():
        if (info["loan_name"] == loanInfo['loan_name']):
            return False
    
    return True
