// routes/orderRoutes.js
const express = require('express');
const OrderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Place a new order (requires authentication)
router.post('/', authenticateToken, OrderController.placeOrder);

// Get order by ID (requires authentication)
router.get('/:id', authenticateToken, OrderController.getOrderById);

// Update order status by ID (requires authentication)
router.put('/:id', authenticateToken, OrderController.updateOrderStatus);

// Get order history for a specific user (requires authentication)
router.get('/history/:userId', authenticateToken, OrderController.getOrderHistory);

module.exports = router;
