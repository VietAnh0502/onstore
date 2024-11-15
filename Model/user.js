const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // This field will not be included when the user is returned in queries
  },
  height: {
    type: Number, // Fix: ensure you have defined this as a number type
    required: false, // Optional field
  },
  weight: {
    type: Number, // Added weight field
    required: false, // Optional field
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
