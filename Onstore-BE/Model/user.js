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
    select: false 
  },
  height: {
    type: Number,
    required: false, 
  },
  weight: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest', 'employee'],
    default: 'user', 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  refreshTokens: [String], // Added refreshTokens field to store refresh tokens for the user
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
