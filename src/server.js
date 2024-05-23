import express from 'express';
import cors from 'cors';
import { envPort } from './utils/envPort.js';
import { ENV_VARS } from './constants/constants.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res, next) => {
    res.send('Hello world');
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Page wasn`t found!',
    });
  });

  app.listen(
    envPort(ENV_VARS.PORT, 3000),
    console.log(`Server is running on ${process.env[ENV_VARS.PORT]}`),
  );
};
