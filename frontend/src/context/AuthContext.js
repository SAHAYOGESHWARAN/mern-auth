import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Hook to use AuthContext in other components
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage user state

  // Fake login function (replace with real API calls)
  const login = (userData) => {
    // Save user data to state
    setUser(userData);
    // Optionally store user data in local storage or cookies
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Fake logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data
  };

  // Retrieve user from localStorage if available on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
