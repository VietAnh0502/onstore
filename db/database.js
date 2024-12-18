//connectdb
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Function to get the password from password.txt
const getPassword = () => {
  const passwordFilePath = path.join(__dirname, 'password.txt');
  return fs.readFileSync(passwordFilePath, 'utf8').trim(); // Read and trim the password
};

// Define the MongoDB connection URI with the retrieved password
const connectDB = async () => {
  const username = 'DDnyar03'; // Your MongoDB username
  const password = getPassword(); // Read the password from the file
  const cluster = 'onstore.cno59.mongodb.net'; // Your MongoDB cluster address
  const databaseName = 'test'; // The database you want to connect to

  const uri = `mongodb+srv://${username}:${password}@${cluster}/${databaseName}?retryWrites=true&w=majority&appName=OnStore`;

  try {
    await mongoose.connect(uri); // Connect to MongoDB using the URI
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

module.exports = connectDB;
