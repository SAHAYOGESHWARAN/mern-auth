import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use AuthContext for managing authentication

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use logout function from AuthContext

  // Fetch user details once the component is mounted
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        // If there's no token, redirect to login
        navigate('/login');
        return;
      }

      try {
        const { data } = await axios.get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again later.');
        localStorage.removeItem('authToken');
        logout(); // Call logout function from AuthContext
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, logout]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    logout(); // Call logout function from AuthContext
    navigate('/login');
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error handling
  if (error) {
    return <div>{error}</div>;
  }

  // If the user data is loaded and there's no error
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {/* Additional user-specific content can go here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
