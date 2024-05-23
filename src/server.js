import express from 'express';
import cors from 'cors';

export const setupServer = () => {
  const app = express();

  app.use(cors());
};
