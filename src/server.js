import express from 'express';
import cors from 'cors';
import { logger } from './utils/pino.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { Routers } from './routes/api/Routers.js';

export const setupServer = () => {
  const app = express();

  app.listen(
    env(ENV_VARS.PORT, 3000),
    console.log(`Server is running on ${env(ENV_VARS.PORT)}`),
  );

  app.use(logger());
  app.use(cors());
  app.use(express.json());

  app.use(Routers.contactsRouter);

  app.use(Routers.authRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);
};
