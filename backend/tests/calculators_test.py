import pytest

from src.calculators import repay_calc, borrow_calc, extra_payment

############################## Repayment calc tests ##############################
# Test correct result is outputted
def test_repayment_example():

    example = repay_calc(300000, 7, 30, "monthly", 0)
    print(example['repay_value'])
    assert(example['repay_value'] == 1999)