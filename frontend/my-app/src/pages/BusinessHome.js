import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const BusinessHomePage = () => {
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
  return (
    <div>
      BusinessHome
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default BusinessHomePage;
