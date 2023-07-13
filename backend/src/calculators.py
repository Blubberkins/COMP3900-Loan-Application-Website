import math

def repay_calc(principal, interest, duration, frequency, type):
    '''
    Given the inputs, calculates the repayment value per period of time,
    total value of payments made, total interest on the mortgage, and
    principal remaining per year
    
    Arguments:
        principal(int) - The amount borrowed
        interest(float) - Interest rate on the loan per year
        duration(int) - Loan duration in years
        frequency(string) - Frequency at which the repayments are made
                            monthly, fortnightly, weekly
        type (int) - Repayment type given as number of interest only years

    Return Value:
        Returns a dictionary with the following:

        repay_value(int): Repayment value over the given period of time
        repay_total(int): Total value of the loan repayments
        repay_interest(int): Total value of the interest on the loan
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
    repay_total = repay_value*n + principal*type*interest/100
    repay_interest = repay_total - principal

    # Determine the principal value after every year and add the coordinate
    # (year, principal) to a list
    repay_graph = []
    p = principal
    for year in range(duration + 1):
        if year > type:
            p = do_principal_calc(p, r, freq, repay_value)
        repay_graph.append((int(year), int(p)))

    return {
        'repay_value': math.ceil(repay_value),
        'repay_total': math.ceil(repay_total),
        'repay_interest': math.ceil(repay_interest),
        'repay_graph' : repay_graph,
    }  

def extra_payment(principal, interest, duration, frequency, type, extra):
    '''
    Given the inputs, calculates the total length of the loan until the
    mortgage is paid off, principal remaining per year, and interest difference
    
    Arguments:
        principal(int) - The amount borrowed
        interest(float) - Interest rate for the package per year
        duration(int) - Loan duration in years
        frequency(string) - Frequency at which the repayments are made
                            monthly, fortnightly, weekly
        type (int) - Repayment type given as number of interest only years
        extra (int) - Extra payment per period of time
        
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
    repay_total = repay_value*n + principal*type*interest/100
    
    extra_value = math.ceil(repay_value + extra)

    extra_graph = []
    p = principal
    time = 0
    while p > extra_value*(1 + r):
        if time/freq > type:
            p = do_principal_calc(principal, r, time - type*freq, extra_value)

        # Only add the point to the graph after a year,
        # or for the last payment
        if (time % freq) == 0 and p > extra_value*(1 + r):
            extra_graph.append((time/freq, int(p)))
        elif p <= extra_value*(1 + r):
            extra_graph.append((time/freq, 0))

        if p > extra_value*(1 + r): time += 1

    extra_total = extra_value*(time - type*freq) + p*(1 + r) + principal*type*interest/100
    interest_diff = repay_total - extra_total

    years = int(time / freq)

    # Months will contain the number of extra payment
    # periods in the last year. An extra payment will be required
    # if the principal is not yet 0. Then this value can be
    # converted to months.
    months = time % freq
    if p != 0:
        months += 1

    if frequency == "fortnightly":
        months = months/2
    if frequency == "weekly":
        months = months/4

    return {
        'interest_diff': math.ceil(interest_diff),
        'years': years,
        'months': months,
        'extra_graph': extra_graph
    }

def borrow_calc(joint, no_dependents, income, rental_income, other_income,
                living_expenses, loans, credit_limit, interest, duration):
    '''
    Given the inputs, calculates the maximum amount that can be borrowed over
    the duration of the loan by determining the monthly surplus
    
    Arguments:
        joint(int) - Whether the loan is joint or not (0 for false, 1 for true)
        no_dependents(int) - Number of dependents
        income(int) - Income earned before tax per year
        rental_income(int) - Rental income per month
        other_income(int) - Other income (bonus, overtime, dividends) per year
        living_expenses(int) - Estimated living expenses per month
        loan(int) - Loan repayments per month
        credit_limit(int) - Total credit card limit
        interest(float) - Interest rate on the loan per year
        duration(int) - Loan duration in years

    Return Value:
        Returns a dictionary with the following:

        borrowing_power(int): The estimated max borrowing amount over the duration
    '''

    # Monthly surplus = Gross income - (tax + expenses)

    # Gross income = Income + 0.8 * rental income + other
    gross_income = income + 0.8*rental_income*12 + other_income
    tax = calc_tax(gross_income)

    # Expenses = max(estimated living expenses, HEM) + loans + 0.025 * total credit limit

    # HEM is the estimated living expenses for a family of the given size
    # First array is not joint, +1 dependent for each column
    # Second array is joint, +1 dependent for each column
    hem = [[1306, 1701, 2085, 2514, 2943, 3372, 3801],
           [2971, 3273, 3511, 3775, 4039, 4303, 4567]]
    
    expenses = max(living_expenses, hem[joint][no_dependents]) + loans + 0.025 * credit_limit

    a = (gross_income - tax)/12 - expenses 
    r = interest/1200
    n = duration*12

    borrowing_power = max(0, do_borrow_calc(r, n ,a))

    return {
        'borrowing_power': int(borrowing_power) 
    }

# Converts frequency string to int
def conv_freq(frequency):

    if frequency == "monthly":
        return 12
    elif frequency == "fortnightly":
        return 26
    elif frequency == "weekly":
        return 52

# Calculates repayment amount given initial principal,
# interest rate, and number of payment periods    
def do_repay_calc(p, r, n):
    # Formula for principal + interest repayment is
    # A = P[ r(1 + r)^n ] / [ (1 + r)^n - 1 ]

    return p * ((r * (1 + r)**n) / ((1 + r)**n - 1))

# Calculates principal amount given initial principal,
# interest rate, number of payment periods, and repayment
# amount
def do_principal_calc(p, r, n, a):
    # Formula for remainining principal is:
    # P' = P(1 + r)^n - A[ (1 + r)^n - 1 ]/r

    return p * (1 + r)**n - (a/r) * ((1 + r)**n - 1)

# Calculates borrowing power given interest rate,
# number of payment periods, and payment amount per period
def do_borrow_calc(r, n, a):
    # Formula for max principal is:
    # P =  A[ (1 + r)^n - 1 ]/[ r * (1 + r)^n ]

    return (a * ((1 + r)**n - 1))/(r * (1 + r)**n)

# Calculates tax/year for an income/year input
def calc_tax(income):
    # Tax brackets:
    # 0 for under $18,200
    # 19c/$ for $18,200 to $45,000
    # $5092 + 32.5c/$ for $45,001 to $120,000
    # $29,427 + 37c/$ for $120,001 to $180,000
    # $51,667 + 45c/$ for $180,000 +

    if income <= 18200:
        tax = 0
    elif income <= 45000:
        tax = 0.19 * (income - 18200)
    elif income <= 120000:
        tax = 5092 + 0.325 * (income - 45000)
    elif income <= 180000:
        tax = 29427 + 0.37 * (income - 120000)
    else:
        tax = 51667 + 0.45 * (income - 180000)

    return tax