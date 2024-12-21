// collectionController.js
const express = require('express');
const router = express.Router();
const Collection = require('../Model/collection');
const arthorizeRole = require('../Middleware/arthorizeRole');
const validateAccessToken = require('../Middleware/arthorizeToken');

//protect product controller with roleMiddleware and artorizeTokenMiddleware
//router.use(validateAccessToken);
//router.use(arthorizeRole('admin','employee'));

// Create a new collection
router.post('/api/collections', async (req, res) => {
  try {
    const newCollection = new Collection(req.body);
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all collections
router.get('/api/collections', async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a collection by ID
router.get('/api/collections/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a collection
router.put('/api/collections/:id', async (req, res) => {
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCollection) return res.status(404).json({ message: 'Collection not found' });
    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a collection
router.delete('/api/collections/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });
    res.status(204).send(); // No content to send
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products in a collection by collection ID
router.get('/api/collections/:id/products', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).populate('products'); 
    if (!collection) return res.status(404).json({ message: 'Collection not found' });
    res.status(200).json(collection.products); // Return products associated with the collection
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Export the collection routes
module.exports = router;