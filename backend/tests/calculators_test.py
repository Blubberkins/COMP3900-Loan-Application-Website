import pytest

from src.calculators import repay_calc, borrow_calc, extra_payment

############################## Repayment calc tests ##############################
# Test correct result is outputted for basic example
def test_repayment_basic():

    example = repay_calc(300000, 6, 30, "monthly", 0)
    assert(abs(example['repay_value'] - 1799) < 1)
    assert(abs(example['repay_total'] - 647515) < 10)
    assert(abs(example['repay_interest'] - 347515) < 10)

    assert(example['repay_graph'][0][1] == 300000)
    assert(abs(example['repay_graph'][1][1] - 296316) < 10)
    assert(abs(example['repay_graph'][2][1] - 292405) < 10)
    assert(abs(example['repay_graph'][3][1] - 288252) < 10)
    assert(abs(example['repay_graph'][4][1] - 283843) < 10)
    assert(abs(example['repay_graph'][5][1] - 279163) < 10)

# Test correct result is outputted for different frequencies
def test_repayment_frequency():

    example = repay_calc(300000, 6, 30, "fortnightly", 0)
    assert(abs(example['repay_value'] - 830) < 1)
    assert(abs(example['repay_total'] - 647204) < 10)

    example2 = repay_calc(300000, 6, 30, "weekly", 0)
    assert(abs(example2['repay_value'] - 415) < 1)
    assert(abs(example2['repay_total'] - 647071) < 10)

# Test correct result is outputted when interest only years included
def test_repayment_interest_only():

    example = repay_calc(300000, 6, 30, "monthly", 1)
    assert(abs(example['repay_value'] - 1822) < 1)
    assert(abs(example['repay_total'] - 651713) < 10)
    assert(example['repay_graph'][1][1] == 300000)
    assert(abs(example['repay_graph'][2][1] - 296040) < 10)

    example2 = repay_calc(300000, 6, 30, "monthly", 2)
    assert(abs(example2['repay_value'] - 1846) < 1)
    assert(abs(example2['repay_total'] - 656046) < 10)
    assert(example2['repay_graph'][1][1] == 300000)
    assert(example2['repay_graph'][2][1] == 300000)
    assert(abs(example2['repay_graph'][3][1] - 295739) < 10)

############################## Extra repayment tests ##############################
# Test correct result is outputted for basic example
def test_extra_payment_example():

    example = extra_payment(300000, 6, 30, "monthly", 0, 200)
    assert(example['years'] == 23)
    assert(example['months'] == 3)
    assert(abs(example['interest_diff'] - 91287) < 10)

    assert(abs(example['extra_graph'][1][1] - 293844) < 10)
    assert(abs(example['extra_graph'][2][1] - 287310) < 10)
    assert(abs(example['extra_graph'][3][1] - 280371) < 10)
    assert(abs(example['extra_graph'][4][1] - 273005) < 10)
    assert(abs(example['extra_graph'][5][1] - 265185) < 10)
    assert(abs(example['extra_graph'][23][1] - 4466) < 10)
    assert(example['extra_graph'][24][1] == 0)

# Test correct result is outputted for different frequencies
def test_extra_payment_frequency():

    example = extra_payment(300000, 6, 30, "fortnightly", 0, 100)
    assert(example['years'] == 22)
    # Should be 20 more payments, which is 10 more months.
    assert(example['months'] == 10)
    assert(abs(example['interest_diff'] - 96794) < 10)

    example2 = extra_payment(300000, 6, 30, "weekly", 0, 100)
    assert(example2['years'] == 18)
    # Should be 32 more payments, which is 8 more months.
    assert(example2['months'] == 8)
    assert(abs(example2['interest_diff'] - 149042) < 10)

# Test correct result is outputted when interest only years included
def test_extra_payment_interest_only():

    example = extra_payment(300000, 6, 30, "monthly", 1, 200)
    assert(example['extra_graph'][1][1] == 300000)
    assert(abs(example['extra_graph'][2][1] - 293561) < 10)
    assert(abs(example['extra_graph'][3][1] - 286725) < 10)

    assert(example['years'] == 23)
    assert(example['months'] == 8)

    assert(abs(example['interest_diff'] - 84715) < 10)  

    example2 = extra_payment(300000, 6, 30, "monthly", 2, 200)
    assert(example2['extra_graph'][1][1] == 300000)
    assert(example2['extra_graph'][2][1] == 300000)
    assert(abs(example2['extra_graph'][3][1] - 293265) < 10)
    assert(abs(example2['extra_graph'][4][1] - 286114) < 10)

    assert(example2['years'] == 24)
    assert(example2['months'] == 1)

    assert(abs(example2['interest_diff'] - 78133) < 10)

############################## Borrowing power calc tests ##############################
# Test correct result is outputted for basic example
def test_borrow_example():

    example = borrow_calc(0, 0, 50000, 0, 0, 0, 0, 0, 6, 30)
    assert(abs(example['borrowing_power'] - 383774) < 10)

# Test correct result is outputted for different dependent values
def test_borrow_dependents():

    example = borrow_calc(0, 1, 50000, 0, 0, 0, 0, 0, 6, 30)
    assert(abs(example['borrowing_power'] - 317891) < 10)

    example2 = borrow_calc(1, 0, 50000, 0, 0, 0, 0, 0, 6, 30)
    assert(abs(example2['borrowing_power'] - 106066) < 10)

# Test correct result is outputted for different expenses
def test_borrow_dependents():

    # Living expenses < HEM so take 1306 instead of 1000
    example = borrow_calc(0, 0, 50000, 0, 0, 1000, 0, 0, 6, 30)
    assert(abs(example['borrowing_power'] - 383774) < 10)

    # Living expenses are higher so 2000 is taken instead of HEM
    example2 = borrow_calc(0, 0, 50000, 0, 0, 2000, 0, 0, 6, 30)
    assert(abs(example2['borrowing_power'] - 268021) < 10)

    # Example with 1000 in loan repayments and credit limit of 10000
    example3 = borrow_calc(0, 0, 50000, 0, 0, 0, 1000, 10000, 6, 30)
    assert(abs(example3['borrowing_power'] - 175285) < 10)

# Test correct result is outputted for different incomes

    # Check tax calc is correct
    example = borrow_calc(0, 0, 130000, 0, 0, 0, 0, 0, 6, 30)
    assert(abs(example['borrowing_power'] - 1128637) < 10)

    # Income with rent and other income
    example2 = borrow_calc(0, 0, 50000, 1000, 5000, 0, 0, 0, 6, 30)
    assert(abs(example2['borrowing_power'] - 520751) < 10)

# Test correct result is outputted when monthly surplus is <= 0

    example = borrow_calc(0, 0, 50000, 0, 0, 5000, 0, 0, 6, 30)
    assert(example['borrowing_power'] == 0)
    