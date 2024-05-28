import express from 'express';
import cors from 'cors';
import { logger } from './utils/pino.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { contactsRouters } from './routes/api/contactsRoutes.js';
import { HttpError } from './utils/HttpError.js';

export const setupServer = () => {
  const app = express();

  app.use(logger());
  app.use(cors());
  app.use(express.json());

  app.use(contactsRouters);

  app.use(contactsRouters);

  app.use(contactsRouters);

  app.use((req, res, next) => {
    next(HttpError(404, 'Not found!'));
  });

  app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error!', data = null } = err;
    res.status(status).json({
      status,
      message,
      data,
    });
  });

  app.listen(
    env(ENV_VARS.PORT, 3000),
    console.log(`Server is running on ${env(ENV_VARS.PORT)}`),
  );
};
