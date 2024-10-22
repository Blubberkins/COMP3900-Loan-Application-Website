import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import HomeLoanPage from './pages/HomeLoanPage';
import LoanResultsPage from './pages/LoanResultsPage';

// loan application for customers section
import PropertyPage from './pages/PropertyPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserIncomePage from './pages/UserIncomePage';
import UserAssetsPage from './pages/UserAssetsPage';
import LoanDetailsPage from './pages/LoanDetailsPage';

import DashboardPage from './pages/DashboardPage';

import RegisterC from './pages/RegisterCPage';
import AccountTypePage from './pages/AccountTypePage';
import RegisterB from './pages/RegisterBPage';
import ProtectedRoute from './pages/ProtectedRoute';
import AppointmentPage from './pages/AppointmentPage';
import BusinessHomePage from './pages/BusinessHome';
import ViewAppointmentPage from './pages/ViewAppointmentPage';
import MakeAppointmentPage from './pages/MakeAppointmentPage';
import AvailableAppointments from './pages/AvailableAppointmentsPage';
import ConfirmAppointments from './pages/ConfirmAppointmentPage';
import BusinessAppointmentPage from './pages/BusinessAppointment';
import BusinessViewAppointmentPage from './pages/BusinessViewAppointmentPage';
import BusinessAvailabilitiesPage from './pages/BusinessAvailabilityPage';
import StartPage from './pages/StartPage';
import CalculatorPage from './pages/CalculatorPage';
import AddPackagePage from './pages/AddPackagePage';

// State management
import { LoanProvider } from './contexts/LoanContext';

function App() {
  return (
    <LoanProvider>
    <div className="">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<StartPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/RegisterC" element={<RegisterC />}></Route>
            <Route path="/RegisterB" element={<RegisterB />}></Route>
            <Route path="/home" element={<ProtectedRoute> <HomePage/> </ProtectedRoute>} />
            <Route path="/SignUp" element={<AccountTypePage />}></Route>
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/add-new-package" element={<AddPackagePage />} />
            <Route path="/edit-package/:packageId" element={<div />} />
            <Route path="/home-loan" element={<HomeLoanPage/>} />
            <Route path="/loan-results" element={<LoanResultsPage />} />
            <Route path="/appointment" element={<AppointmentPage />}/>
            <Route path="/businessHome" element={<BusinessHomePage />} />
            <Route path="/viewAppointment" element={<ViewAppointmentPage />} />
            <Route path="/makeAppointment" element={<MakeAppointmentPage />} />
            <Route path="/availableAppointments/:year/:month/:day" element={<AvailableAppointments />} />
            <Route path="/ConfirmAppointments/:contact/:year/:month/:day/:timeEnd/:timeStart" element={<ConfirmAppointments />} />
            <Route path="/BusinessAppointment" element={<BusinessAppointmentPage/>} />
            <Route path="/BusinessViewAppointment" element={<BusinessViewAppointmentPage/>} />
            <Route path="/BusinessAvailability" element={<BusinessAvailabilitiesPage/>} />
            <Route path="/Calculator" element={<CalculatorPage/>} />

            {/* loan application for customer */}
            <Route path="/page1" element={<PropertyPage />} />
            <Route path="/page2" element={<UserDetailsPage />} />
            <Route path="/page3" element={<UserIncomePage />} />
            <Route path="/page4" element={<UserAssetsPage />} />
            <Route path="/page5" element={<LoanDetailsPage />} />

            <Route path="/dashboard" element={<DashboardPage />} />



        </Routes>
      </BrowserRouter>
    </div>
    </LoanProvider>
  );
}

export default App;
