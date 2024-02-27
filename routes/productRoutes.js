// routes/productRoutes.js
const express = require('express');
const ProductController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get all products
router.get('/', ProductController.getAllProducts);

// Get product by ID
router.get('/:id', ProductController.getProductById);

// Create a new product
router.post('/', ProductController.createProduct);

// Update product by ID
router.put('/:id', ProductController.updateProduct);

// Delete product by ID
router.delete('/:id', ProductController.deleteProduct);

// Search products with advanced filters
router.get('/search', ProductController.searchProducts);

// Add review for a product (requires authentication)
router.post('/review', authenticateToken, ProductController.addReview);

module.exports = router;
