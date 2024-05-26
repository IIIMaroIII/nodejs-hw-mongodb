import express from 'express';
import cors from 'cors';
import { logger } from './utils/pino.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';

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
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found!',
    });
  });

  app.listen(
    env(ENV_VARS.PORT, 3000),
    console.log(`Server is running on ${env(ENV_VARS.PORT)}`),
  );
};
