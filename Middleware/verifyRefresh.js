
//verify token
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
require('dotenv').config();
const JWT_SECRET_REFRESH = process.env.REFRESH_TOKEN_SECRET;

const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken; // Get refresh token from cookies
    console.log("Refresh Token:", refreshToken); // Log the refresh token

    if (!refreshToken) {
        return res.sendStatus(401); // Unauthorized if no refresh token is provided
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET_REFRESH); // Verify the token
        console.log("Decoded Token:", decoded); // Log the decoded token
        const user = await User.findById(decoded.id); // Find the user by ID from the decoded token

        if (!user || !user.refreshTokens.includes(refreshToken)) {
            return res.sendStatus(403); // Forbidden if the user is not found or refresh token is invalid
        }

        req.user = user; // Store user information in request
        next(); // Move to next middleware or route handler
    } catch (err) {
        //console.error("Token verification failed:", err); // Log any error during verification
        return res.sendStatus(403); // Forbidden if the token is invalid
    }
};

module.exports = verifyRefreshToken;