import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import HomeLoanPage from './pages/HomeLoanPage';
import LoanResultsPage from './pages/LoanResultsPage';

import RegisterC from './pages/RegisterCPage';
import AccountTypePage from './pages/AccountTypePage';
import RegisterB from './pages/RegisterBPage';
import ProtectedRoute from './pages/ProtectedRoute';
import AppointmentPage from './pages/AppointmentPage';
import BusinessHomePage from './pages/BusinessHome';
import ViewAppointmentPage from './pages/ViewAppointmentPage';
import MakeAppointmentPage from './pages/MakeAppointmentPage';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/RegisterC" element={<RegisterC />}></Route>
            <Route path="/RegisterB" element={<RegisterB />}></Route>
            <Route path="/home" element={<ProtectedRoute> <HomePage/> </ProtectedRoute>} />
            <Route path="/SignUp" element={<AccountTypePage />}></Route>
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/edit-package/:packageId" element={<div />} />
            <Route path="/home-loan" element={<HomeLoanPage/>} />
            <Route path="/loan-results" element={<LoanResultsPage />} />
            <Route path="/appointment" element={<AppointmentPage />}/>
            <Route path="/businessHome" element={<BusinessHomePage />} />
            <Route path="/viewAppointment" element={<ViewAppointmentPage />} />
            <Route path="/makeAppointment" element={<MakeAppointmentPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
