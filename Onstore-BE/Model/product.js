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
    ref: 'Collection', // The name of the collection model
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Women', //can be expand to selling for man and childern
    ],
  },
  type: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: 'productType', // Make sure to add a comma here
  },
  size: {
    type: String,
    required: true,
    enum: [
      'XS', 'S', 'M', 'L', 'XL', 'XXL',
    ],
  },
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
  stock: {
    type: Number,
    required: true,
    min: 0,
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