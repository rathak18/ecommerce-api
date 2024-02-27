const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config/dotenvConfig');
const connectToDatabase = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();

connectToDatabase();

// Middleware
app.use(express.json());
app.use(morgan('combined')); // You can customize morgan as needed

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
