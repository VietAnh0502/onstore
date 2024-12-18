// productController.js
const express = require('express');
const router = express.Router();
const Product = require('../Model/product');
const arthorizeRole = require('../Middleware/arthorizeRole');
const validateAccessToken = require('../Middleware/arthorizeToken');

//protect product controller with roleMiddleware and artorizeTokenMiddleware
//router.use(validateAccessToken);
//router.use(arthorizeRole('admin','employee'));


// Create a new product
router.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a product by ID
router.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product
router.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
router.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send(); // No content to send
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a review to a product
router.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const { username, rating, text } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = { username, rating, text };
    product.reviews.push(review);
    await product.save();
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews of a product
router.get('/api/products/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('reviews');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    res.status(200).json(product.reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;