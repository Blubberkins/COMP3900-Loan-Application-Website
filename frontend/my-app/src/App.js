import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterC from './pages/RegisterCPage';
import AccountTypePage from './pages/AccountTypePage';
import RegisterB from './pages/RegisterBPage';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<ProtectedRoute> <HomePage/> </ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/RegisterC" element={<RegisterC />}></Route>
          <Route path="/RegisterB" element={<RegisterB />}></Route>
          <Route path="/SignUp" element={<AccountTypePage />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
