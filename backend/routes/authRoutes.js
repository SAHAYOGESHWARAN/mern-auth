
const express = require('express');
const router = express.Router();
const {
  registerUser,
  verifyEmail,
  loginUser,
  requestPasswordReset,
  resetPassword,
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/password-recovery', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
