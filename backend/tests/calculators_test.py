import pytest

from src.calculators import repay_calc, borrow_calc, extra_payment

############################## Repayment calc tests ##############################
# Test correct result is outputted
def test_repayment_example():

    example = repay_calc(300000, 7, 30, "monthly", 0)
    assert(abs(example['repay_value'] - 1996) < 1)
    assert(abs(example['repay_total'] - 718560) < 100)
    assert(abs(example['repay_interest'] - 418560) < 100)

############################## Extra repayment tests ##############################
def test_extra_payment_example():

    example = extra_payment(300000, 7, 30, "monthly", 0, 200)
    # assert(example['extra_graph'][1][1] == 267444)
    # assert(abs(example['interest_diff'] - 117000) < 1000)
    # assert(example['years'] == 23)
    assert(example['payments'] == 50)

############################## Borrowing power calc tests ##############################
def test_borrow_example():

    example = borrow_calc(0, 0, 50000, 0, 0, 0, 0, 0, 5, 30)
    assert(abs(example['borrowing_power'] - 428000) < 1000)
    