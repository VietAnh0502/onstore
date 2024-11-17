const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyRefreshToken = (req, res, next) => {
    const { refreshToken } = req.body; // Get refresh token from the request body
  
    if (!refreshToken) {
      return res.sendStatus(401); // Unauthorized if no refresh token is provided
    }
  
    jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if refresh token is invalid
      }
      
      req.user = user; // Store user information in request
      next(); // Move to the next middleware or route handler
    });
  };

module.exports = verifyRefreshToken;