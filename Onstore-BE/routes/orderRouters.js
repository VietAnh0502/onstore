// orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('./orderController');
const validateAccessToken = require('../Middleware/arthorizeToken');

// Apply middleware for all cart routes
//router.use(validateAccessToken);

// Define routes
router.post('/api/orders', orderController.createOrder);
router.get('/api/orders/currentUser', orderController.getCurrentUserOrder);
router.get('/api/orders', orderController.getAllUserOrders);
router.put('/api/orders/:orderId', orderController.updateOrderStatus);
router.delete('/api/orders/:orderId', orderController.deleteOrder);

module.exports = router;