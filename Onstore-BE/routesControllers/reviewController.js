// reviewController.js

const Product = require('../Model/product'); // Import the Product model

// Add a review to a product
const addReviewToProduct = async (req, res) => {
    const { username, rating, text } = req.body; // Extract incoming review data
    const productId = req.params.id; // Get product ID from the request parameters

    try {
        const product = await Product.findById(productId); // Find the product by ID
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create the new review object
        const newReview = {
            username,
            rating,
            text,
        };

        // Push the new review to the product's reviews array
        product.reviews.push(newReview);
        await product.save(); // Save the updated product with the new review

        res.status(201).json(product); // Return the updated product
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all reviews for a product
const getReviewsForProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId).select('reviews'); // Get only the reviews for the specified product
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product.reviews); // Return the reviews
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export controller functions
module.exports = {
    addReviewToProduct,
    getReviewsForProduct,
};