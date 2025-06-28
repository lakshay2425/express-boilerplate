import mongoose from 'mongoose';
import { config } from './config.js';

const dbURI = config.get("dbURI");
const connectOptions = {
  maxIdleTimeMS: 10000, // Close connections after 10 seconds of inactivity
};

let isConnected = false; // Track connection status

export async function connectToDatabase() {
  if (isConnected) {
    return; // Connection already exists
  }

  try {
    if(!dbURI){
      console.log("MongoDB Connection URL is required")
    }else{
      await mongoose.connect(dbURI, connectOptions);
      console.log('Mongoose connected');
      isConnected = true; // Set connection status
    }
  } catch (error) {
    console.error('Mongoose connection error:', error.message);
    throw error; // Propagate the error
  }
}

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
  isConnected = false;
});

