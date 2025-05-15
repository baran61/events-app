const express = require('express');
const router = express.Router();
const { register, login, sendVerificationEmail, verifyEmail } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

router.post('/send-verification-email', sendVerificationEmail);
router.get('/verify-email', verifyEmail);

module.exports = router;