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

#def borrow_calc(no_people, no_child, no_adult, type, income, expenses, interest, duration):


def conv_freq(frequency):

    if frequency == "monthly":
        return 12
    elif frequency == "fornightly":
        return 26
    elif frequency == "weekly":
        return 52
    
def do_repay_calc(p, r, n):
    # Formula for principal + interest repayment is
    # A = P[ r(1 + r)^n ] / [ (1 + r)^n - 1 ]

    return p * ((r * (1 + r)^n) / ((1 + r)^n - 1))

def do_principal_calc(p, r, n, a):
    # Formula for remainining principal is:
    # P' = P(1 + r)^n - A[ (1 + r)^n - 1 ]/r

    return p * (1 + r)^n - (a * ((1 + r)^n - 1)) / r
