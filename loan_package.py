import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Fetch the service account key JSON file contents
# i used my own firebase for testing but will need to get the key for the group one
cred = credentials.Certificate('secret key.json')
# Initialize the app with a service account, granting admin privileges
# should change permissions for the thingo but idk how
firebase_admin.initialize_app(cred, {'databaseURL': "https://comp3900-e4af5-default-rtdb.asia-southeast1.firebasedatabase.app/"})

# Main Functions
def LP_new(loanInfo, ref):
    if (not LP_sanity(loanInfo)):
        return "Failed Sanity Check"

    ref.push().set(loanInfo)
    return

def LP_edit(loanInfo, loanName, ref):
    if (not LP_sanity(loanInfo)):
        return "Failed Sanity Check"
    
    loans = ref.get()
    found = False

    for key, info in loans.items():
        if (info["loan_name"] == loanName):
            ref.child(key).update(loanInfo)
            found = True
    
    if (found):
        return
    else:
        return "Not Found"

def LP_view(loanName, ref):
    loans = ref.get()
    for key, info in loans.items():
        if (info["loan_name"] == loanName):
            return info
    return "Not Found"

def LP_set_ref(bankName):
    loc = "/Loan_Packages/" + bankName
    ref = db.reference(loc)
    return(ref)

# Helpers
def LP_sanity(loanInfo, ref):
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
    
    # ensure that loans cannot have the same name
    loans = ref.get()
    for key, info in loans.items():
        if (info["loan_name"] == loanInfo['loan_name']):
            return False
    return True

