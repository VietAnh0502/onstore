// product.js
const mongoose = require('mongoose');

// Define the Review schema to include username and rating
const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
  },
  rating: {
    type: Number,
    required: true,
    min: 1, 
    max: 5,  
  },
  text: {
    type: String,
    required: true, // Include the review text
  },
}, { timestamps: true });

// Define the SizeStock schema to manage sizes and their quantities
const sizeStockSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: [
      'XS', 'S', 'M', 'L', 'XL', 'XXL',
    ],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, 
  },
});

// Define the Product schema for clothing items
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  coll: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Collection model
    required: true,
    ref: 'Collection',
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Women', //can be expand to selling for man and children
    ],
  },
  type: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: 'productType',
  },
  sizeStock: [sizeStockSchema], // Change from stock to sizeStock
  color: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: {
    type: [String],
    required: false,
  },
  discountPrice: {
    type: Number,
    required: false,
  },
  averageRating: {
    type: Number,
    required: false,
    min: 0,
    max: 5,
  },
  reviews: [reviewSchema], // Store an array of reviews
  careInstructions: {
    type: String,
    required: false,
  },
  releaseDate: {
    type: Date,
    required: false,
  },
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;