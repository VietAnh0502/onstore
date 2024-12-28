// src/routes/cartRouters.js
const express = require('express');
const router = express.Router();
const guestUserAuth = require('../Middleware/guestUserAuth');
const validateAccessToken = require('../Middleware/arthorizeToken');
const {
    createCart,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
    getCartDetails
} = require('../routesControllers/cartController');

// router.use(guestUserAuth); // middleWare for getting guest or user
// router.use(validateAccessToken);

// Define routes
router.post('/api/carts', guestUserAuth, validateAccessToken, createCart); // Create a new cart
router.post('/api/carts/cartId/items', guestUserAuth, validateAccessToken, addItemToCart); // Add an item to the cart
router.delete('/api/carts/cartId/items/:itemId',guestUserAuth, validateAccessToken, removeItemFromCart); // Remove an item from the cart
router.put('/api/carts/cartId/items/:itemId',guestUserAuth, validateAccessToken, updateItemInCart); // Update item quantity in the cart
router.get('/api/carts/cartId',guestUserAuth, validateAccessToken, getCartDetails); // Get cart details for a user

module.exports = router;