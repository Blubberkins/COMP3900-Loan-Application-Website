import React from 'react';
import {useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully")
        window.sessionStorage.setItem('isLogged', false);
    }).catch((error) => {
    // An error happened.
    });
}
const handleappointment = () => {               
    signOut(auth).then(() => {
        navigate("/appointment");
    }).catch((error) => {
    // An error happened.
    });
}
  return (
    <nav className='bg-gray-100 border-gray-800 font-serif'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a className='flex items-center'>
          <svg
            className='w-10 h-10 text-gray-500 mb-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z' />
          </svg>
          <a href='/home' className='self-center text-3xl font-semibold whitespace-nowrap ml-5'>
            Carbon Bank
          </a>
        </a>
        <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
            <li>
              <a
                href='/login'
                className='block py-2 pl-3 pr-4 text-white rounded md:text-blue-700 md:p-0 text-xl'
                aria-current='page'
              >
                Login
              </a>
            </li>
            <li>
              <a
                href='/home-loan'
                className='block py-2 pl-3 pr-4 text-white rounded md:text-blue-700 md:p-0 text-xl'
                aria-current='page'
              >
                Find Loan
              </a>
            </li>
            <li>
              <a
                href='/calculator'
                className='block py-2 pl-3 pr-4 text-black hover:bg-transparent hover:text-blue-700 md:p-0 text-xl'
              >
                Calculator
              </a>
            </li>
            <li>
              <a
                href='page1'
                className='block py-2 pl-3 pr-4 text-gray-700 hover:bg-transparent hover:text-blue-700 md:p-0 text-xl'
              >
                Loan Application
              </a>
            </li>
            <li>
              <a
                onClick={handleappointment}
                className='block py-2 pl-3 pr-4 text-gray-500 hover:bg-transparent hover:text-blue-700 md:p-0 text-xl'
              >
                Make Appointment
              </a>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className='block py-2 pl-3 pr-4 text-gray-400 hover:bg-transparent hover:text-blue-700 md:p-0 text-xl'
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
