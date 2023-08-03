import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import CarbonHero from '../components/CarbonHero';
import DashboardPage from './DashboardPage';

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
  const handleAppointment = () => {
    navigate('/BusinessAppointment')
  };
  return (
    <div>
      <CarbonHero/>
      <DashboardPage/>
    </div>
  );
};

export default BusinessHomePage;
