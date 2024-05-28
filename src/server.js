import express from 'express';
import cors from 'cors';
import { logger } from './utils/pino.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { contactsRouters } from './routes/api/contactsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(logger());
  app.use(cors());
  app.use(express.json());

  app.use(contactsRouters);

  // app.use(contactsRouters);

  // app.use(contactsRouters);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(
    env(ENV_VARS.PORT, 3000),
    console.log(`Server is running on ${env(ENV_VARS.PORT)}`),
  );
};
