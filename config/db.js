// config/db.js
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./dotenvConfig');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectToDatabase;
