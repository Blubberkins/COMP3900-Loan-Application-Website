import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, useHistory } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        window.sessionStorage.setItem('isLogged', true);
        window.sessionStorage.setItem('name', user.displayName)
        setAuthenticated(true);
        if (user.displayName == "business") {
          navigate('/businessHome');
        }
        else {navigate('/home');}
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorMessage(errorMessage);
      });
  };
  if (authenticated) {
    return (
      <section className='bg-gray-50'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Redirecting to Home...
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form className='space-y-4 md:space-y-6'>
              {errorMessage && ( // Render error message if it exists
                <div className='text-red-500'>{errorMessage}</div>
              )}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email-address'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-between'>
                <a
                  href='/home'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={onLogin}
                type='submit'
                className='transition ease-in-out duration-500 bg-transparent hover:bg-[#9b774e] w-full text-black font-semibold hover:text-white py-2 px-4 mr-3 mt-4 border border-black hover:border-transparent rounded'
              >
                Sign in
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <a
                  href='/SignUp'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
