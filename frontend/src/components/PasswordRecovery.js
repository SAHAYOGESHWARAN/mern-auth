import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/password-recovery', { email });
      alert('Password recovery email sent! Please check your inbox.');
    } catch (error) {
      console.error('Error sending password recovery email', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Password Recovery</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Recovery Email</button>
    </form>
  );
};

export default PasswordRecovery;
