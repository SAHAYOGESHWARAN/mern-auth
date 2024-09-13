import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user details once the component is mounted
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        // If there's no token, redirect to login
        navigate('/login');
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
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // If the user data is not loaded yet, show a loading message
  if (!user) {
    return <div>Loading...</div>;
  }

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
