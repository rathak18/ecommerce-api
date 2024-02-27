// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const validateData = require('../middleware/validationMiddleware');
const { SECRET_KEY } = require('../config/dotenvConfig');

const UserController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Validate data
      const validation = validateData(req.body, ['username', 'email', 'password']);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Check if user with the same email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate data
      const validation = validateData(req.body, ['email', 'password']);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Check if the user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getProfile: async (req, res) => {
    try {
      // Access the user from the authentication middleware
      const { user } = req;

      // Fetch the user details from the database
      const userProfile = await UserModel.findById(user.userId, { password: 0 }); // Exclude password from the response

      if (!userProfile) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(userProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = UserController;
