import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailVerification = ({ match }) => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { token } = match.params;
        await axios.post('/api/auth/verify-email', { token });
        setVerified(true);
      } catch (error) {
        console.error('Error verifying email', error);
      }
    };
    verifyEmail();
  }, [match.params]);

  return (
    <div>
      {verified ? <h2>Email Verified!</h2> : <h2>Verifying...</h2>}
    </div>
  );
};

export default EmailVerification;
