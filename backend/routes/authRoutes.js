
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { registerUser } = require('../controllers/authController');


// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Generate and send OTP
router.post('/password-recovery', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It expires in 1 hour.`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST route for user registration
router.post('/register', registerUser);


module.exports = router;
