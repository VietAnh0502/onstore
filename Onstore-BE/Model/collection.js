// collection.js
const mongoose = require('mongoose');

// Define the Collection schema
const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure collection names are unique
    trim: true,
  },
  description: {
    type: String,
    required: false, // Optional field for a description
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create and export the Collection model
const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;