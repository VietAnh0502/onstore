// productTypeRoutes.js

const express = require('express');
const router = express.Router();
const {
    createProductType,
    getAllProductTypes,
    getProductTypeById,
    updateProductType,
    deleteProductType,
} = require('../routesControllers/productTypeController'); // Adjust the path if necessary

// Define routes
router.post('/api/product-types', createProductType); // Create a new product type
router.get('/api/product-types', getAllProductTypes); // Get all product types
router.get('/api/product-types/:id', getProductTypeById); // Get a product type by ID
router.put('/api/product-types/:id', updateProductType); // Update a product type by ID
router.delete('/api/product-types/:id', deleteProductType); // Delete a product type by ID

// Export the router
module.exports = router;