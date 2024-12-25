// reviewRoutes.js

const express = require('express');
const router = express.Router();
const {
    addReviewToProduct,
    getReviewsForProduct,
} = require('../routesControllers/reviewController'); // Adjust path if necessary

// Define routes
router.post('/api/products/:id/reviews', addReviewToProduct); // Add a review to a product
router.get('/api/products/:id/reviews', getReviewsForProduct); // Get all reviews for a product

// Export the router
module.exports = router;