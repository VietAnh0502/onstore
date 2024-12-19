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
  images: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create and export the Collection model
const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;