// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', UserController.register);

// Login and get JWT token
router.post('/login', UserController.login);

// Get user profile (requires authentication)
router.get('/profile', authenticateToken, UserController.getProfile);

module.exports = router;
