
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const { sendOtp } = require('../services/twilioService');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { JWT_SECRET } = process.env;

// Registration Controller
const registerUser = async (req, res) => {
  const { email, password, username, mobileNo } = req.body;

  try {
    const newUser = new User({ email, password, username, mobileNo });

    // Generate OTP and expiration
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    newUser.otp = otp;
    newUser.otpExpires = otpExpires;

    await newUser.save();

    // Send OTP via Twilio
    await sendOtp(mobileNo, otp);
    // Or send email verification if preferred
    // await sendEmail(email, 'Email Verification', `Your OTP is ${otp}`);

    res.status(200).json({ message: 'Registration successful! Please check your mobile for OTP verification.' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

// Email Verification Controller
const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed. Please try again.' });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password)) || !user.isVerified) {
      return res.status(400).json({ message: 'Invalid email or password or account not verified' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

// Password Recovery Controller
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 15 * 60 * 1000;

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOtp(user.mobileNo, otp);
    // Or send email if preferred
    // await sendEmail(email, 'Password Recovery', `Your OTP is ${otp}`);

    res.status(200).json({ message: 'OTP sent for password recovery.' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing password recovery. Please try again.' });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password. Please try again.' });
  }
};

module.exports = { registerUser, verifyEmail, loginUser, requestPasswordReset, resetPassword };
