import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/constants.js';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB } = ENV_VARS;
  const connectionLink = `mongodb+srv://${env(MONGODB_USER)}:${env(
    MONGODB_PASSWORD,
  )}@cluster0.v8klsoh.mongodb.net/${env(
    MONGODB_DB,
  )}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(connectionLink);
    console.log('Successfully database connection');
  } catch (error) {
    console.log(error);
  }
};
