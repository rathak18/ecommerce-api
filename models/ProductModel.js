const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  stock: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
