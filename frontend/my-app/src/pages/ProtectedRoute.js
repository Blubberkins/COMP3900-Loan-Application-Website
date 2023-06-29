import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('isLogged')
  if (!token) {
      return <Navigate to="/Login" replace />
  }
  return children
}

export default ProtectedRoute