const express = require('express');
const { register, login, verifyEmail, passwordRecovery, resetPassword } = require('../controllers/authController');
const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/password-recovery', passwordRecovery);
router.post('/reset-password', resetPassword);

module.exports = router;
