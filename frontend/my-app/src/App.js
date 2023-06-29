import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import HomeLoanPage from './pages/HomeLoanPage';
import LoanResultsPage from './pages/LoanResultsPage';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/overview" element={<OverviewPage />} />
                    <Route path="/edit-package/:packageId" element={<div />} />
                    <Route path="/home-loan" element={<HomeLoanPage/>} />
                    <Route path="/loan-results" element={<LoanResultsPage />} />
                    <Route path="/appointment" element={<div />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
