import math

def repay_calc(principal, interest, duration, frequency, type):
    '''
    Given the inputs, calculates the repayment value per period of time,
    total value of payments made, total interest on the mortgage, and
    principal remaining per year
    
    Arguments:
        principal(int) - the amount borrowed
        interest(float) - the interest rate for the package
        duration(int) - the duration of the loan
        frequency(string) - the frequency at which the repayments are made
                            monthly, fortnightly, weekly
        type (int) - repayment type given as number of interest only years
        
    Exceptions:
        Input Error - 

    Return Value:
        Returns a dictionary with the following:

        repay_value(int): The repayment value over the given period of time
        repay_total(int): The total value of the loan repayments
        repay_interest(int): The total value of the interest on the loan
        repay_graph: A list of coordinates for a graph displaying principal over time
    '''

    freq = conv_freq(frequency)
    r = (interest/freq)/100
    n = (duration - type)*freq

    repay_value = do_repay_calc(principal, r, n)

    # Total repayment is the repayment value * number of payments made
    # + interest for interest only years

    # Formula for interest only repayment is
    # A = P(r/n)
    repay_total = repay_value*n + principal*type*r
    repay_interest = repay_total - principal

    # Determine the principal value after every year and add the coordinate
    # (year, principal) to a list
    repay_graph = []
    p = principal
    for year in range(duration + 1):
        p = do_principal_calc(p, r, freq, repay_value)
        repay_graph.append((year, int(p)))

    return {
        'repay_value': int(repay_value),
        'repay_total': int(repay_total),
        'repay_interest': int(repay_interest),
        'repay_graph' : repay_graph,
    }  

def extra_payment(principal, interest, duration, frequency, type, extra):
    '''
    Given the inputs, calculates the total length of the loan until the
    mortgage is paid off, principal remaining per year, and interest difference
    
    Arguments:
        principal(int) - the amount borrowed
        interest(float) - the interest rate for the package
        duration(int) - the duration of the loan
        frequency(string) - the frequency at which the repayments are made
                            monthly, fortnightly, weekly
        type (int) - repayment type given as number of interest only years
        extra (int) - extra payment per period of time
        
    Exceptions:
        Input Error - 

    Return Value:
        Returns a dictionary with the following:

        interest_diff(int): Total interest reduction due to extra payments
        years (int): Number of years required to pay off loan
        months (int): Number of months required to pay off loan
        extra_graph: A list of coordinates for a graph displaying principal over time

    '''

    freq = conv_freq(frequency)
    r = (interest/freq)/100
    n = (duration - type)*freq

    repay_value = do_repay_calc(principal, r, n)
    repay_total = repay_value*n + principal*type*r
    
    extra_value = do_repay_calc(principal, r, n) + extra

    extra_graph = []
    p = principal
    time = 0
    while p > extra_value*(1 + r):
        p = do_principal_calc(p, r, time, extra_value)

        # Only add the point to the graph after a year,
        # or for the last payment
        if (time % freq) == 0 or p <= extra_value*(1 + r):
            extra_graph.append((time/freq, int(p)))

        if p > 0: time += 1

    extra_total = extra_value*time + p*(1 + r) + principal*type*r
    interest_diff = extra_total - repay_total

    years = int(time / frequency)
    months = math.ceil(time % frequency)

    return {
        'interest_diff': int(interest_diff),
        'years': years,
        'months': months,
        'extra_graph': extra_graph
    }

def borrow_calc(joint, no_dependents, income, rental_income, other_income,
                living_expenses, loans, credit_limit, interest, duration):

    # Monthly surplus = Gross income - (tax + expenses)

    # Gross income = Income + 0.8 * rental income + other
    gross_income = income/12 + 0.8*rental_income + other_income/12
    tax = calc_tax(gross_income*12)

    # Expenses = max(estimated living expenses, HEM) + loans + 0.025 * total credit limit

    # HEM is the estimated living expenses for a family of the given size
    # First array is not joint, +1 dependent for each column
    # Second array is joint, +1 dependent for each column
    hem = [[1306, 1701, 2085, 2514, 2943, 3372, 3801],
           [2971, 3273, 3511, 3775, 4039, 4303, 4567]]
    
    expenses = max(living_expenses, hem[joint, no_dependents]) + loans + 0.025 * credit_limit

    a = gross_income - tax - expenses 
    r = interest/1200
    n = duration*12

    return max(0, do_borrow_calc(r, n ,a))

# Converts frequency string to int
def conv_freq(frequency):

    if frequency == "monthly":
        return 12
    elif frequency == "fornightly":
        return 26
    elif frequency == "weekly":
        return 52

# Calculates repayment amount given initial principal,
# interest rate, and number of payment periods    
def do_repay_calc(p, r, n):
    # Formula for principal + interest repayment is
    # A = P[ r(1 + r)^n ] / [ (1 + r)^n - 1 ]

    return p * ((r * (1 + r)^n) / ((1 + r)^n - 1))

# Calculates principal amount given initial principal,
# interest rate, number of payment periods, and repayment
# amount
def do_principal_calc(p, r, n, a):
    # Formula for remainining principal is:
    # P' = P(1 + r)^n - A[ (1 + r)^n - 1 ]/r

    return p * (1 + r)^n - (a * ((1 + r)^n - 1)) / r

# Calculates borrowing power given interest rate,
# number of payment periods, and payment amount per period
def do_borrow_calc(r, n, a):
    # Formula for max principal is:
    # P =  A[ (1 + r)^n - 1 ]/[ r * (1 + r)^n ]

    return (a * ((1 + r)^n - 1))/(r * (1 + r)^n)

# Calculates tax/month for an income/year input
def calc_tax(income):
    # Tax brackets:
    # 0 for under $18,200
    # 19c/$ for $18,200 to $45,000
    # $5092 + 32.5c/$ for $45,001 to $120,000
    # $29,427 + 37c/$ for $120,001 to $180,000
    # $51,667 + 45c/$ for $180,000 +

    if 12 * income <= 18200:
        tax = 0
    elif 12 * income <= 45000:
        tax = 0.19 * income
    elif 12 * income <= 120000:
        tax = 5092/12 + 0.325 * income
    elif 12 * income <= 180000:
        tax = 29427/12 + 0.37 * income
    else:
        tax = 51667/12 + 0.45 * income

    return tax