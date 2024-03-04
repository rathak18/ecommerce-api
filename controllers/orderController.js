// controllers/orderController.js
const OrderModel = require('../models/OrderModel');
const ProductModel = require('../models/ProductModel');
const validateData = require('../middleware/validationMiddleware');

const OrderController = {
  placeOrder: async (req, res) => {
    try {
      const { userId, products } = req.body;

      // Validate data
      const validation = validateData(req.body, ['userId', 'products']);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Check if the user exists
      // Note: In a real-world scenario, you would likely have user authentication in place
      // and retrieve the userId from the authenticated user rather than from the request body.
      // Here, we are assuming userId is provided in the request body for simplicity.
      // Ensure to implement proper user authentication in a production environment.
      const userExists = await UserModel.findById(userId);
      if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the products exist and have sufficient stock
      const productsInfo = await Promise.all(
        products.map(async (product) => {
          const { productId, quantity } = product;
          const productInfo = await ProductModel.findById(productId);

          if (!productInfo || productInfo.stock < quantity) {
            return null; // Invalid product or insufficient stock
          }

          return {
            product: {
              _id: productInfo._id,
              name: productInfo.name,
              price: productInfo.price,
            },
            quantity,
          };
        })
      );

      if (productsInfo.some((info) => !info)) {
        return res.status(400).json({ message: 'Invalid product or insufficient stock' });
      }

      // Calculate total price
      const totalPrice = productsInfo.reduce((acc, info) => acc + info.product.price * info.quantity, 0);

      // Create a new order
      const newOrder = new OrderModel({
        userId,
        products: productsInfo,
        totalPrice,
        status: 'placed',
      });

      // Save the order to the database
      await newOrder.save();

      // Update product stock levels
      await Promise.all(
        productsInfo.map(async (info) => {
          const { product, quantity } = info;
          const updatedStock = product.stock - quantity;
          await ProductModel.findByIdAndUpdate(product._id, { stock: updatedStock });
        })
      );

      res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate data
      const validation = validateData(req.body, ['status']);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Update the order status in the database
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getOrderHistory: async (req, res) => {
    try {
      const { userId } = req.params;
      const orderHistory = await OrderModel.find({ userId });

      res.status(200).json(orderHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = OrderController;
