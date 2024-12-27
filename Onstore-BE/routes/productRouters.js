// productRoutes.js
const express = require('express');
const router = express.Router();
// Mock data cho sản phẩm
const productDetail = {
    id: "1a",
    name: "PASSION - 3 PC",
    price: 26,
    originalPrice: 32,
    discount: 20,
    color: "L-GREEN",
    productCode: "1W24P3P173-L-GREEN",
    sku: "210000-4707160",
    status: "In Stock",
    images: [
      "/images/product1-main.jpg",
      "/images/product1-1.jpg",
      "/images/product1-2.jpg",
      "/images/product1-3.jpg"
    ],
    details: {
      type: "Unstitched 3-Piece Suit",
      shirt: "Digital Printed Heavy Weight Khaddar 1.75M",
      dupatta: "Digital Printed Heavy Weight Khaddar 2.5M",
      trouser: "Dyed Heavy Weight Khaddar Trouser 1.8M"
    }
  };
  
  router.get('/product/:id', (req, res) => {
    res.json(productDetail);
  });
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addReviewToProduct,
    getProductReviews,
    updateSizeStock,
} = require('../routesControllers/productController');
const arthorizeRole = require('../Middleware/arthorizeRole');
const validateAccessToken = require('../Middleware/arthorizeToken');

// Protect product routes with middleware if necessary
// router.use(validateAccessToken);
// router.use(arthorizeRole('admin', 'employee'));

// Define routes
router.post('/api/products', createProduct); // Create a new product
router.get('/api/products', getAllProducts); // Get all products
router.get('/api/products/:id', getProductById); // Get a product by ID
router.put('/api/products/:id', updateProduct); // Update a product
router.delete('/api/products/:id', deleteProduct); // Delete a product
router.post('/api/products/:id/reviews', addReviewToProduct); // Add a review to a product
router.get('/api/products/:id/reviews', getProductReviews); // Get all reviews of a product
router.put('/api/products/:id/sizeStock', updateSizeStock); // Add or update size stock

// Export the product routes
module.exports = router;