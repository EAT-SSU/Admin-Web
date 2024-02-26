import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { getLoggedIn } = useAuth();
  return getLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
