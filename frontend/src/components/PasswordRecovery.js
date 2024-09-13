import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/auth/password-recovery', { email });
      setSuccess('Password recovery email sent! Please check your inbox.');
    } catch (error) {
      console.error('Error sending password recovery email', error);
      setError('Failed to send password recovery email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Password Recovery</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Recovery Email'}
        </button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
