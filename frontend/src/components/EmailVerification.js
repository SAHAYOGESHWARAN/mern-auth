import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post('/api/auth/verify-email', { token });
        setVerified(true);
      } catch (error) {
        setError('Verification failed. The token may be invalid or expired.');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setError('No token provided.');
    }
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {verified ? <p>Email successfully verified!</p> : <p>Verifying...</p>}
    </div>
  );
};

export default EmailVerification;
