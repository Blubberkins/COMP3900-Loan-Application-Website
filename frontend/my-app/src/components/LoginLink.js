import React from 'react';
import { Formik, Form, Field } from 'formik';

export const LoginLink = () => {
  return (
    <div className='bg-gray-50 text-right'>
        already have an account? <a href="/login" className=" text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline mr-10">Login</a>
    </div>
  )
};
