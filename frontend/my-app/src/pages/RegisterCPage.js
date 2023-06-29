import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { passwordSchema } from '../schemas/passwordSchema';

const RegisterC = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  };

  const onSubmit = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        window.sessionStorage.setItem('isLogged', true);
        console.log(user);
      })

      navigate('/home');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(values.password)) {
      errors.password =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      <Form>
        <section className='bg-gray-50 dark:bg-gray-900'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Create your Carbon account
                </h1>
                <div className='grid gap-12 mb-6 md:grid-cols-2'>
                  <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      First Name
                    </label>
                    <Field
                      type='text'
                      name='firstName'
                      id='firstName'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='john'
                      required
                    />
                    <ErrorMessage
                      name='firstName'
                      component='div'
                      className='text-red-500'
                    />
                  </div>
                  <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Last Name
                    </label>
                    <Field
                      type='text'
                      name='lastName'
                      id='lastName'
                      placeholder='doe'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                    />
                    <ErrorMessage
                      name='lastName'
                      component='div'
                      className='text-red-500'
                    />
                  </div>
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Username
                  </label>
                  <Field
                    type='text'
                    name='username'
                    id='username'
                    placeholder='username'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='text-red-500'
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Email address
                  </label>
                  <Field
                    type='email'
                    name='email'
                    id='email'
                    placeholder='You@gmail.com'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-500'
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Password
                  </label>
                  <Field
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500'
                  />
                </div>
                <button
                  type='submit'
                  className='transition ease-in-out duration-500 bg-transparent hover:bg-[#9b774e] w-full text-black font-semibold hover:text-white py-2 px-4 mr-3 mt-4 border border-black hover:border-transparent rounded'
                >
                  Create an account
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{' '}
                  <a
                    href='/login'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Form>
    </Formik>
  );
};

export default RegisterC;
