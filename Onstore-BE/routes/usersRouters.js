// usersRoutes.js

const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    userAuthStatus,
    refreshAccessToken,
    logoutUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../routesControllers/userController.js');
const verifyAccessToken = require('../Middleware/verifyAuthAccess.js');
const verifyRefreshToken = require('../Middleware/verifyRefresh.js');
const validateAccessToken = require('../Middleware/arthorizeToken');
const guestUserAuth = require('../Middleware/guestUserAuth');
const arthorizeRole = require('../Middleware/arthorizeRole.js');

// Define routes
router.post('/users/registration', registerUser); // Register a new user
router.post('/api/users/login', loginUser); // User login
router.get('/api/users/authStatus',guestUserAuth, validateAccessToken, userAuthStatus); // Check for http-only tokens
router.post('/api/users/refresh', verifyRefreshToken, refreshAccessToken); // Refresh access token
router.post('/api/users/logout', validateAccessToken ,logoutUser); // Logout user
router.get('/api/users', validateAccessToken, arthorizeRole('admin'), getAllUsers); // Get all users
router.get('/api/users/:id', getUserById); // Get a user by ID
router.put('/api/users/:id',validateAccessToken, arthorizeRole('admin','employee'), updateUser); // Update a user
router.delete('/api/users/:id',validateAccessToken, arthorizeRole('admin','employee'), deleteUser); // Delete a user

// Export the router
module.exports = router;