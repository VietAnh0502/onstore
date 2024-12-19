const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const connectDB = require('./db/database'); 
const userRoutes = require('./routes/usersController'); 
const productRoutes = require('./routes/productController'); 
const reviewRoutes = require('./routes/reviewController');
const collectionRoutes = require('./routes/collectionController');
const cartRoutes = require('./routes/cartController');

const app = express();
const PORT = process.env.PORT || 3002;


// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies
app.use(cors()); // Enable Cross-Origin Resource Sharing, accpting call to api

// Use user routes
app.use(userRoutes); 
app.use(productRoutes); 
app.use(cartRoutes); 
app.use(reviewRoutes);
app.use(collectionRoutes);



async function startServer() {
  await connectDB();  // Connect to database
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

// Start the server
startServer();
