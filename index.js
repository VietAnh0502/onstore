const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/database'); 
const userRoutes = require('./routes/usersController'); 
const productRoutes = require('./routes/productController'); 
const cartRoutes = require('./routes/cartController');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// Use user routes
app.use(userRoutes); // Prefix for user endpoints
app.use(productRoutes); // This will prefix all product routes

async function startServer() {
  await connectDB();  // Connect to database
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

// Start the server
startServer();
