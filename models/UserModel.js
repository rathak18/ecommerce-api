// models/UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // Hashed and salted password should be stored here
  // Additional fields as needed
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
