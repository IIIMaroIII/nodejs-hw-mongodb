import express from 'express';
import cors from 'cors';
import { logger } from './utils/pino.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { router } from './routes/api/index.js';

export const setupServer = () => {
  const app = express();

  app.listen(
    env(ENV_VARS.PORT, 3000),
    console.log(`Server is running on ${env(ENV_VARS.PORT)}`),
  );

  app.use(logger());
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);
};
