// models/OrderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  status: String, // e.g., 'placed', 'shipped', 'delivered'
  // Additional fields as needed
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
