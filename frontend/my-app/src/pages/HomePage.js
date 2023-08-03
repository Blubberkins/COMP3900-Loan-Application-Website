import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Calculator } from '../components/Calculator';
import Navbar from '../components/Navbar';

const Home = () => {
  const userName = window.sessionStorage.getItem('name');
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/login');
        console.log('Signed out successfully');
        window.sessionStorage.setItem('isLogged', false);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleappointment = () => {
    signOut(auth)
      .then(() => {
        navigate('/appointment');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <Navbar />
      <section class='bg-gray-50'>
        <div class='mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center'>
          <div class='mx-auto max-w-xl text-center'>
            <h1 class='font-extrabold text-5xl mb-5'>
              Hello {userName}
              <strong class='font-extrabold text-red-700 block mt-10'>
                Your Journey Starts here
              </strong>
            </h1>

            <p class='mt-4 text-xl/relaxed'>
              Your path to homeownership and financial empowerment starts here.
              Whether you're taking your first steps or you're well-versed in
              the mortgage process, Carbon Mortgage Bank is here to guide
              you with expertise and unwavering support.
            </p>

            <div class='mt-8 flex flex-wrap justify-center gap-4'>
              <a
                class='block rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 w-auto'
                href='/appointment'
              >
                Get Started
              </a>

              <a
                class='block rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 w-auto'
                href='/about'
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
