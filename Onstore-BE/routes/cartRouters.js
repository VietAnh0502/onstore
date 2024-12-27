// src/routes/cartRouters.js
const express = require('express');
const router = express.Router();
const guestUserAuth = require('../Middleware/guestUserAuth');
const {
    createCart,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
    getCartDetails
} = require('../routesControllers/cartController');

//router.use(guestUserAuth); // middleWare for getting guest or user

// Define routes
router.post('/api/carts', guestUserAuth, createCart); // Create a new cart
router.post('/api/carts/:cartId/items', addItemToCart); // Add an item to the cart
router.delete('/api/carts/:cartId/items/:itemId', removeItemFromCart); // Remove an item from the cart
router.put('/api/carts/:cartId/items/:itemId', updateItemInCart); // Update item quantity in the cart
router.get('/api/carts/:cartId', getCartDetails); // Get cart details for a user

module.exports = router;