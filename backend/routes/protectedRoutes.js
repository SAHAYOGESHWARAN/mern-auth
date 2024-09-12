const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/dashboard', protect, (req, res) => {
  res.status(200).json({ message: `Welcome to the dashboard, ${req.user.email}` });
});

module.exports = router;
