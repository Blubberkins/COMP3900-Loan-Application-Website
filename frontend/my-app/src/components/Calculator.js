import React from "react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";

export const Calculator = () => {
  const initialValues = {
    numPeopleApply: "",
    numPeopleSupport: "",
    propertyType: "",
    income: "",
    incomePeriod: "",
    expense: "",
    expensePeriod: "",
  };

  const [borrowAmount, setBorrowAmount] = useState(30000);

  const onSubmit = async (values) => {
    console.log(values)
  };

  const validate = (values) => {
    const errors = {};

    if (!values.numPeopleApply) {
      errors.numPeopleApply = "required";
    }

    if (!values.numPeopleSupport) {
      errors.numPeopleSupport = "required";
    }

    if (!values.propertyType) {
      errors.username = "required";
    }
    if (!values.income) {
      errors.business = "required";
    }

    if (!values.expense) {
      errors.email = "required";
    }

    return errors;
  };
  return (
    <section className="bg-white">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <div className="grid max-w-7xl m-auto grid-cols-1 px-5 gap-7 mx-auto lg:px-8 md:grid-cols-2 md:divide-x md:divide-y-0 divide-y text-black">
          <Form className="grid gap-5 mb-6">
            <h1 className="text-2xl">How Much I can borrow</h1>
            <div className="grid gap-5 grid-cols-2">
              <h3 className="text-xl col-span-2">
                How many people are applying?
              </h3>
              <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <Field
                  id="numPeopleApply"
                  type="checkbox"
                  value="1"
                  name="numPeopleApply"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"               
                />
                <label
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  one
                </label>
              </div>
              <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="numPeopleApply"
                  type="checkbox"
                  value="2"
                  name="numPeopleApply"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  two
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-5">
                How many people are you financially supporting?
              </h3>
              <Field
                type="text"
                name="numPeopleSupport"
                id="numPeopleSupport"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div className="grid gap-5 grid-cols-2">
              <h3 className="text-xl col-span-2">
                What type of property are you looking to buy?
              </h3>
              <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <Field
                  id="propertyType"
                  type="checkbox"
                  value="A home"
                  name="propertyType"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  A home
                </label>
              </div>
              <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <Field
                  id="propertyType"
                  type="checkbox"
                  value="A Investment property"
                  name="propertyType"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  An Investment property
                </label>
              </div>
            </div>
            <div className="grid gap-5 grid-cols-2">
              <h3 className="text-xl col-span-2">What is your income?</h3>
              <Field
                type="text"
                name="income"
                id="income"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
              <Field
                as="select"
                name="incomePeriod"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option value="year">Year</option>
                <option value="month">Month</option>
                <option value="fortnight">Fortnight</option>
              </Field>
            </div>
            <div className="grid gap-5 grid-cols-2">
              <h3 className="text-xl col-span-2">What are your expenses?</h3>
              <Field
                type="text"
                name="expense"
                id="expense"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
              <Field
                as="select"
                name="expensePeriod"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option value="year">Year</option>
                <option value="month">Month</option>
                <option value="fortnight">Fortnight</option>
              </Field>
            </div>
            <button
              type="submit"
              className="transition ease-in-out duration-500 bg-transparent hover:bg-black w-full text-black font-semibold hover:text-white py-2 px-4 mr-3 mt-4 border border-black hover:border-transparent rounded"
            >
              Calculate
            </button>
          </Form>
          <Form>
            <div className="ml-7">
              <h1 className="text-3xl">You can borrow</h1>
              <h2 className="text-2xl">
                <span>$</span>
                {borrowAmount}
              </h2>
              <div className="grid gap-5 grid-cols-2">
                <h3 className="text-xl col-span-2">
                  At principal and interest repayments of
                </h3>
                <div className="col-span-2">
                  <span className="mx-2">$x</span>

                  <Field
                    as="select"
                    name="color"
                    className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 w-32"
                  >
                    <option value="Per-year"> Per Year</option>
                    <option value="Per-month"> Per Month</option>
                    <option value="Per-fortnight">Per Fortnight</option>
                  </Field>
                  <span className="mx-2">over</span>
                  <Field
                    as="select"
                    name="color"
                    className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 w-32"
                  >
                    <option value="20-year">20 Years</option>
                    <option value="10-month">10 Years</option>
                    <option value="5-fortnight">5 Years</option>
                  </Field>
                </div>
                <h3 className="text-xl col-span-2">At an interest rate of</h3>
                <Field
                  as="select"
                  name="color"
                  className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 w-32"
                >
                  <option value="20%">20%</option>
                  <option value="10%">10%</option>
                  <option value="5%">5%</option>
                </Field>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </section>
  );
};
