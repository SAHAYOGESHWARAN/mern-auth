import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = match.params;
      await axios.post('/api/auth/reset-password', { token, password });
      alert('Password reset successful!');
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
