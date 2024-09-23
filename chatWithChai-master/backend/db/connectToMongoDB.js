import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectToMongoDB = async () => {
  try {
    // MongoDB URI from environment variables
    const uri = process.env.MONGO_DB_URI;

    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }

    // Connect to MongoDB without deprecated options
    await mongoose.connect(uri);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
  }
};

export default connectToMongoDB;
