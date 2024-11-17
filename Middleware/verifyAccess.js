const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from the "Authorization" header

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    
    req.user = user; // Store user information in request
    next(); // Move to the next middleware or route handler
  });
};

module.exports = verifyToken;