import mongoose from 'mongoose';
import type {Error, ConnectOptions} from 'mongoose';
import { config } from './config.js';

const dbURI:string = config.get("dbURI");

const connectOptions:ConnectOptions = {
  maxIdleTimeMS: 10000, // Close connections after 10 seconds of inactivity
};

let isConnected:boolean = false; // Track connection status

export async function connectToDatabase():Promise<void> {
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
  } catch (error:unknown) {
    const err = error as Error;
    console.error('Mongoose connection error:', err.message);
    throw err; // Propagate the error
  }
}

mongoose.connection.on('error', (err:Error) => {
  console.error('Mongoose connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
  isConnected = false;
});

