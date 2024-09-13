import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext to manage authentication

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Retrieve the current user from your auth context

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
