import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

export const Calculator = () => {
  const initialValues = {
    numPeopleApply: '',
    numPeopleSupport: '',
    propertyType: '',
    income: '',
    incomePeriod: 'year',
    expense: '',
    expensePeriod: 'year',
    loan: '',
    loanPeriod: 'year',
    credit: '',
    repayDuration: '',
    repayPeriod: '',
    interest: '',

  };
  const [borrowAmount, setBorrowAmount] = useState(0);
  const [repayDuration, setrepayDuration] = useState('year');
  const [repayPeriod, setrepayPeriod] = useState('20');
  const [interest, setinterest] = useState('6.24');
  const [showModal, setShowModal] = useState(false);
  const [Sending, setSending] = useState(false);

  const onSubmit = async (values) => {
    setShowModal(true);
    setSending(true);
    console.log(values);
    console.log(repayPeriod);
    try {
      const response = await axios.post(
        'http://localhost:5000/calculators/borrow',
        values
      );
      setSending(false);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
      setBorrowAmount(response['data']['borrowing_power']);
    } catch (error) {
      console.error('Error occurred during the request: ', error);
    }
  };
  return (
    <section className='bg-white'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <div className='grid max-w-7xl m-auto grid-cols-1 px-5 gap-7 mx-auto lg:px-8 md:grid-cols-2 md:divide-x md:divide-y-0 divide-y text-black'>
          <Form className='grid gap-5 mb-6'>
            <h1 className='text-2xl'>How Much I can borrow</h1>
            <div className='grid gap-5 grid-cols-2'>
              <h3 className='text-xl col-span-2'>
                How many people are applying?
              </h3>
              <div className='flex items-center pl-4 border border-gray-200 rounded'>
                <Field
                  id='numPeopleApply'
                  type='radio'
                  value='0'
                  name='numPeopleApply'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                  required // Make the radio button required
                />
                <label
                  htmlFor='numPeopleApply1'
                  className='w-full py-4 ml-2 text-sm font-medium text-gray-900'
                >
                  one
                </label>
              </div>
              <div className='flex items-center pl-4 border border-gray-200 rounded'>
                <Field
                  id='numPeopleApply'
                  type='radio'
                  value='1'
                  name='numPeopleApply'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                  required // Make the radio button required
                />
                <label
                  htmlFor='numPeopleApply2'
                  className='w-full py-4 ml-2 text-sm font-medium text-gray-900'
                >
                  two
                </label>
              </div>
            </div>
            <div>
              <h3 className='text-xl mb-5'>
                How many people are you financially supporting?
              </h3>
              <Field
                type='text'
                name='numPeopleSupport'
                id='numPeopleSupport'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                placeholder='1-6'
                required
              />
            </div>
            <div className='grid gap-5 grid-cols-2'>
              <h3 className='text-xl col-span-2'>
                What type of property are you looking to buy?
              </h3>
              <div className='flex items-center pl-4 border border-gray-200 rounded'>
                <Field
                  id='propertyType'
                  type='radio'
                  value='A home'
                  name='propertyType'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                  required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900'>
                  A home
                </label>
              </div>
              <div className='flex items-center pl-4 border border-gray-200 rounded'>
                <Field
                  id='propertyType'
                  type='radio'
                  value='A Investment property'
                  name='propertyType'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                  required
                />
                <label className='w-full py-4 ml-2 text-sm font-medium text-gray-900'>
                  An Investment property
                </label>
              </div>
            </div>
            <div className='grid gap-5 grid-cols-2'>
              <h3 className='text-xl col-span-2'>What is your income?</h3>
              <Field
                type='text'
                name='income'
                id='income'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                placeholder=''
                required
              />
              <Field
                as='select'
                name='incomePeriod'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              >
                <option value='year'>Year</option>
                <option value='month'>Month</option>
                <option value='fortnight'>Fortnight</option>
              </Field>
            </div>
            <div className='grid gap-5 grid-cols-2'>
              <h3 className='text-xl col-span-2'>What are your expenses?</h3>
              <Field
                type='text'
                name='expense'
                id='expense'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                placeholder=''
                required
              />
              <Field
                as='select'
                name='expensePeriod'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              >
                <option value='year'>Year</option>
                <option value='month'>Month</option>
                <option value='fortnight'>Fortnight</option>
              </Field>
            </div>
            <div className='grid gap-5 grid-cols-2'>
              <h3 className='text-xl col-span-2'>Current Loan repayments</h3>
              <Field
                type='text'
                name='loan'
                id='loan'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                placeholder=''
                required
              />
              <Field
                as='select'
                name='loanPeriod'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              >
                <option value='year'>Year</option>
                <option value='month'>Month</option>
                <option value='fortnight'>Fortnight</option>
              </Field>
            </div>
            <div>
              <h3 className='text-xl col-span-2'>Total credit card limit</h3>
              <Field
                type='text'
                name='credit'
                id='credit'
                className='w-1/2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5'
                placeholder=''
                required
              />
            </div>
            <button
              type='submit'
              className='transition ease-in-out duration-500 bg-transparent hover:bg-black w-full text-black font-semibold hover:text-white py-2 px-4 mr-3 mt-4 border border-black hover:border-transparent rounded'
            >
              Calculate
            </button>
            </Form>
            <div className=''>
              <h1 className='text-3xl ml-5'>You can borrow</h1>
              <h2 className='text-2xl ml-5'>
                <span>$</span>
                {borrowAmount}
              </h2>
            </div>
        </div>
      </Formik>
      <div
        className={`fixed bottom-4 left-4 text-white p-2 rounded shadow-lg z-50 ease-in-out duration-500 transition-opacity ${
          showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex items-center'>
          <p className='flex items-center text-[#059669] bg-[#D1FAE5] text-center rounded-full px-4 py-1'>
            {Sending ? 'Calculating...' : 'Calculated'}
            {Sending ? (
              <svg
              aria-hidden='true'
              className={`inline h-7 w-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 ml-2`}
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            ) : (
              <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`h-7 w-7 ml-11`}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 13l4 4L19 7' />
            </svg>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};
