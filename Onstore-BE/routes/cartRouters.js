// src/routes/cartRouters.js
const express = require('express');
const router = express.Router();
const verifyAccessToken = require('../Middleware/verifyAuthAccess');
const verifyRefreshToken = require('../Middleware/verifyRefresh');
const validateAccessToken = require('../Middleware/arthorizeToken');
const {
    createCart,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
    getCartDetails
} = require('../routesControllers/cartController');

// Apply middleware for all cart routes
//router.use(validateAccessToken);

// Define routes
router.post('/api/carts', createCart); // Create a new cart
router.post('/api/carts/:cartId/items', addItemToCart); // Add an item to the cart
router.delete('/api/carts/:cartId/items/:itemId', removeItemFromCart); // Remove an item from the cart
router.put('/api/carts/:cartId/items/:itemId', updateItemInCart); // Update item quantity in the cart
router.get('/api/carts/:cartId', getCartDetails); // Get cart details for a user

module.exports = router;