import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const [verified, setVerified] = useState(null); // Use null to represent undefined state
  const [error, setError] = useState(null);
  const { token } = useParams(); // Use useParams to access route parameters
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          throw new Error('Verification token is missing');
        }
        await axios.post('/api/auth/verify-email', { token });
        setVerified(true);
      } catch (error) {
        console.error('Error verifying email', error);
        setError('Failed to verify email. Please check the link and try again.');
      }
    };

    verifyEmail();
  }, [token]);

  const handleRetry = () => {
    // Handle retry logic, e.g., re-send verification email
    // navigate('/resend-verification'); // Example redirect to resend verification
  };

  return (
    <div>
      {verified === null ? (
        <h2>Verifying...</h2>
      ) : verified ? (
        <div>
          <h2>Email Verified!</h2>
          <p>Your email has been successfully verified. You can now log in.</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      ) : (
        <div>
          <h2>Verification Failed</h2>
          <p>{error}</p>
          <button onClick={handleRetry}>Retry Verification</button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
