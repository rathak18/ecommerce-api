// controllers/productController.js
const ProductModel = require('../models/ProductModel');
const validateData = require('../middleware/validationMiddleware');

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const { page = 1, sortBy = 'name', sortOrder = 'asc' } = req.query;

      // Validate input
      const validation = validateData(req.query, ['page', 'sortBy', 'sortOrder']);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      const skip = (page - 1) * PAGE_SIZE;

      const products = await ProductModel.find()
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(PAGE_SIZE);

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, description, price, stock } = req.body;

      // Validate data
      const validation = validateData(req.body, ['name', 'description', 'price', 'stock']);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Create a new product
      const newProduct = new ProductModel({
        name,
        description,
        price,
        stock,
      });

      // Save the product to the database
      await newProduct.save();

      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;

      // Validate data
      const validation = validateData(req.body, ['name', 'description', 'price', 'stock']);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Update the product in the database
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { name, description, price, stock },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // Delete the product from the database
      const deletedProduct = await ProductModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  searchProducts: async (req, res) => {
    try {
      const { minPrice, maxPrice, category } = req.query;

      // Build the query object based on the provided parameters
      const query = {};
      if (minPrice !== undefined) query.price = { $gte: minPrice };
      if (maxPrice !== undefined) query.price = { ...query.price, $lte: maxPrice };
      if (category !== undefined) query.category = category;

      const products = await ProductModel.find(query);

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addReview: async (req, res) => {
    try {
      const { productId, rating, review } = req.body;

      // Validate data
      const validation = validateData(req.body, ['productId', 'rating', 'review']);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // TODO: Check if the user has purchased the product before allowing a review

      // Update product with the new review
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
          $push: { reviews: { userId: req.user.userId, rating, review } },
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Review added successfully', updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  }
}

module.exports = ProductController;
