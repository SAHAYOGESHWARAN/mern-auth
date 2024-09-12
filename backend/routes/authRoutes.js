const express = require('express');
const { register, verifyEmail, login, passwordRecovery } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/password-recovery', passwordRecovery);

module.exports = router;
