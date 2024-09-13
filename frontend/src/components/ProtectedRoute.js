import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Now the path exists

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
