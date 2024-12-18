//schema cart
const mongoose = require('mongoose');

// Define the CartItem schema to store products and their quantities
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
    required: true,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Minimum quantity of 1
  },
});

// Define the Cart schema for a user
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: 'user',
  },
  items: [cartItemSchema], // Array of cart items
  total: {
    type: Number,
    default: 0, // Default total amount
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;