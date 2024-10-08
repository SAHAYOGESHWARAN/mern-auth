import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post('/api/auth/password-recovery', { email });
      setMessage('Password recovery email sent! Please check your inbox.');
    } catch (error) {
      setError('Failed to send recovery email. Please try again.');
    }
  };

  return (
    <div>
      <h1>Password Recovery</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Recovery Email</button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
