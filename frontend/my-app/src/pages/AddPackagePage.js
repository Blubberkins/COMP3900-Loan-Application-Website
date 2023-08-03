import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const AddPackagePage = () => {
  const initialValues = {
    loan_name: '',
    lvr: '',
    loan_purpose: '',
    interest_rate: '',
    ir_type: '',
    additional_payments: '',
    redraws: '',
  };
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post('http://localhost:5000/new', values);
      console.log(response);
    } catch (error) {
      console.error('Error occurred during the request: ', error);
    }
  };
  return (
    <section className='bg-white'>
      <header className='flex items-center justify-between p-6 bg-blue-500'>
        <h1 className='text-2xl font-bold text-white'>Carbon Bank</h1>
      </header>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <div className='grid max-w-4xl m-auto grid-cols-1 px-5 gap-7 mx-auto lg:px-8 divide-x md:divide-y-0 divide-y text-black mt-10'>
          <Form>
            <div className='mb-6'>
              <label className='block mb-2 text-sm font-medium text-gray-900'>
                Name of Package
              </label>
              <Field
                name='loan_name'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder='name@flowbite.com'
                required
              />
            </div>
            <div className='mb-6'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Loan value ratio
              </label>
              <Field
                type='number'
                step='0.01'
                name='lvr'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                required
              />
            </div>
            <div className='grid gap-5 grid-cols-2 mb-2'>
              <h3 className='block text-sm font-medium text-gray-900 col-span-2'>
                Loan Purpose
              </h3>
              <div className='flex items-center pl-4 border border-gray-200 rounded-lg h-11'>
                <Field
                  id='loan_purpose'
                  type='radio'
                  value='investment'
                  name='loan_purpose'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700'
                  required // Make the radio button required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Investment
                </label>
              </div>
              <div className='flex items-center pl-4 border border-gray-200 rounded-lg h-11'>
                <Field
                  id='loan_purpose'
                  type='radio'
                  value='live_in'
                  name='loan_purpose'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  required // Make the radio button required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Home
                </label>
              </div>
            </div>
            <div className='mb-6'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                interest rate
              </label>
              <Field
                type='number'
                step='0.01'
                name='interest_rate'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                required
              />
            </div>
            <div className='grid gap-5 grid-cols-2 mb-2'>
              <h3 className='block text-sm font-medium text-gray-900 col-span-2'>
                Interest rate type
              </h3>
              <div className='flex items-center pl-4 border border-gray-200 rounded-lg h-11'>
                <Field
                  type='radio'
                  value='fixed'
                  name='ir_type'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700'
                  required // Make the radio button required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  fixed
                </label>
              </div>
              <div className='flex items-center pl-4 border border-gray-200 rounded-lg h-11'>
                <Field
                  type='radio'
                  value='variable'
                  name='ir_type'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  required // Make the radio button required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  variable
                </label>
              </div>
            </div>
            <div className='grid gap-5 grid-cols-2 mb-2'>
              <h3 className='block text-sm font-medium text-gray-900 col-span-2'>
                Interest rate type
              </h3>
              <div className='flex items-center pl-4 border border-gray-200 rounded-lg h-11'>
                <Field
                  type='radio'
                  value='true'
                  name='additional_payments'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700'
                  required // Make the radio button required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  True
                </label>
              </div>
              <div className='flex items-center pl-4 border border-gray-200 rounded-lg h-11'>
                <Field
                  type='radio'
                  value='false'
                  name='additional_payments'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  required // Make the radio button required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  False
                </label>
              </div>
            </div>
            <div className='grid gap-5 grid-cols-2 mb-2'>
              <h3 className='block text-sm font-medium text-gray-900 col-span-2'>
                Redraws
              </h3>
              <div className='flex items-center pl-4 border border-gray-200 rounded-lg h-11'>
                <Field
                  type='radio'
                  value='true'
                  name='redraws'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700'
                  required // Make the radio button required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Yes
                </label>
              </div>
              <div className='flex items-center pl-4 border border-gray-200 rounded-lg h-11'>
                <Field
                  type='radio'
                  value='false'
                  name='redraws'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  required // Make the radio button required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  No
                </label>
              </div>
            </div>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Submit
            </button>
          </Form>
        </div>
      </Formik>
    </section>
  );
};

export default AddPackagePage;
