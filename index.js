const express = require('express');
const connectDB = require('./db/database'); // Ensure this path is correct
const userRoutes = require('./routes/usersController'); // Import the user routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // For parsing application/json

// Use user routes
app.use(userRoutes); // Prefix for user endpoints

async function startServer() {
  await connectDB();  // Connect to database
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

// Start the server
startServer();
