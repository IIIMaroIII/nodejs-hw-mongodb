import express from 'express';
import cors from 'cors';
import { envPort } from './utils/envPort.js';
import { ENV_VARS } from './constants/constants.js';
import { logger } from './utils/pino.js';
import mongoose from 'mongoose';

export const setupServer = () => {
  const app = express();

  app.use(logger());
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      name: 'Yulia Shevchenko',
      phoneNumber: '+380000000001',
      email: 'oleh1@example.com',
      isFavourite: false,
      contactType: 'personal',
      createdAt: '2024-05-08T16:12:14.954151',
      updatedAt: '2024-05-08T16:12:14.954158',
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found!',
    });
  });

  mongoose
    .connect(process.env[ENV_VARS.MONGODB_URL])
    .then(() => {
      app.listen(
        envPort(ENV_VARS.PORT, 3000),
        console.log(`Server is running on ${process.env[ENV_VARS.PORT]}`),
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

// mongoDB_user = rodionmeuro
// mongoDB_password = 2WY4iw44GJWziHo8
//2WY4iw44GJWziHo8
