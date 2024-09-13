import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext
  const location = useLocation(); // Get current location for redirecting

  // Check if the user is authenticated
  if (!user) {
    // Redirect to login page with the current location to return to after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
