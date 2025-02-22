from firebase_admin import db

from flask import request, jsonify, Blueprint

loan_package = Blueprint('loan_package', __name__)

# Main Functions
@loan_package.route("/new", methods = ['POST'])
def LP_new():
    ref = LP_set_ref()
    loanInfo = LP_get()
    if (not LP_sanity(loanInfo)):
        return jsonify({'message': 'Failed Sanity Check'})

    ref.push().set(loanInfo)
    return jsonify({'message': 'Success'})

@loan_package.route("/edit", methods = ['POST'])
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

@loan_package.route("/remove", methods = ['POST'])
def LP_remove():
    ref = LP_set_ref()
    loanName = request.form.get("loan_name")

    loans = ref.get()
    for key, info in loans.items():
        if (info["loan_name"] == loanName):
            deleteRef = ref.child(key)
            deleteRef.delete()
            return ({'message': 'Success'})

    return ({'message': 'Package Not Found'})

@loan_package.route("/view", methods = ['GET'])
def LP_view():
    ref = LP_set_ref()
    loanName = request.form.get("loan_name")

    loans = ref.get()
    for key, info in loans.items():
        if (info["loan_name"] == loanName):
            return jsonify({'message': info})
    return jsonify({'message': 'Package Not Found'})

@loan_package.route("/view_all", methods = ['GET'])
def LP_view_all():
    ref = LP_set_ref()
    loans = ref.get()
    return jsonify({'message': loans})

# Helpers

def LP_set_ref():
    return db.reference("/CarbonBank/Loan_Packages")

def LP_get():
    payload = request.get_json()
    if payload["additional_payments"] == 'true':
        payload["additional_payments"] = True
    if payload["additional_payments"] == 'false':
        payload["additional_payments"] = False
    if payload["redraws"] == 'true':
        payload["redraws"] = True
    if payload["redraws"] == 'false':
        payload["redraws"] = False
    if isinstance(payload.get("interest_rate"), int):
        payload["interest_rate"] = float(payload["interest_rate"])
    if isinstance(payload.get("lvr"), int):
        payload["lvr"] = float(payload["lvr"])
    print(payload)
    return {
        "loan_name" : payload["loan_name"],
        "lvr" : payload["lvr"],
        "loan_purpose" : payload["loan_purpose"],
        "interest_rate" : payload["interest_rate"],
        "ir_type" : payload["ir_type"],
        "additional_payments" : payload["additional_payments"],
        "redraws" : payload["redraws"]
    }

@loan_package.route("/repayment", methods = ['GET'])
def LP_repayment():
    ref = LP_set_ref()
    loans = ref.get()

    loanName = request.form.get("loan_name")
    repayTime = request.form.get("loan_time")
    repayPeriod = request.form.get("loan_period")
    loanAmount = request.form.get("loan_amount")

    loans = ref.get()
    for key, info in loans.items():
        if (info["loan_name"] == loanName):
            rate = info["interest_rate"] 
    
    # run function from calculator
    repay = 0
    return repay

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
