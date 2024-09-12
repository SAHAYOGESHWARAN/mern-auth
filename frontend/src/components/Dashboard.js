import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('/api/auth/dashboard', config);
      setUser(data.message);
    };

    fetchUser();
  }, []);

  return <h2>{user}</h2>;
};

export default Dashboard;
