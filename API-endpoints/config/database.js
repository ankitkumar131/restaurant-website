const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Database configuration
const connectDB = async () => {
  try {
    // Get database name from environment or use default
    const dbName = process.env.DB_NAME || 'foofio-restaurant';
    
    // Get connection string from environment or use default local connection
    const connectionString = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;
    
    // Connect to MongoDB
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host} (Database: ${dbName})`);
    
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 