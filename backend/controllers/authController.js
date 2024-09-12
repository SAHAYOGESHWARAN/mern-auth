const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Register User
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const token = jwt.sign({ id: user._id, verificationToken }, process.env.JWT_SECRET, { expiresIn: '10m' });

    // Send email with verification link
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
    const message = `Click the link to verify your email: ${verificationUrl}`;
    await sendEmail(user.email, 'Email Verification', message);

    res.status(201).json({ success: true, message: 'Registration successful, check your email to verify!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ success: false, message: 'Invalid token' });

    user.isVerified = true;
    await user.save();
    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    if (!user.isVerified) return res.status(400).json({ success: false, message: 'Please verify your email' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Password Recovery
exports.passwordRecovery = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Email not found' });

    // Generate password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send reset email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `Click the link to reset your password: ${resetUrl}`;
    await sendEmail(user.email, 'Password Recovery', message);

    res.status(200).json({ success: true, message: 'Password recovery email sent' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
