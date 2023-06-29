from flask import Flask, request, jsonify
from login import User # placeholder for retrieving user info file

app = Flask(__name__)

@app.route("/preferences",  methods=['POST'])
def loanPreferences():

    # retrieve user info
    user = User.getUser() # placeholder for retrieving user info function
    
    # get user input for loan purpose (live-in/investment), ir type (fixed/variable),
    # ability to make additional payments (Y/N), and access to redraws (Y/N)
    loan_purpose = request.form.get('loan_purpose')
    ir_type = request.form.get('ir_type')
    additional_payments = request.form.get('additional_payments')
    redraws = request.form.get('redraws')

    # set user preferences to the new ones (using preferences placeholder)
    user.preferences['loan_purpose'] = loan_purpose
    user.preferences['ir_type'] = ir_type
    user.preferences['additional_payments'] = additional_payments
    user.preferences['redraws'] = redraws

    # return the new user preferences
    return jsonify(user.preferences)