import express from 'express';
import { JoiSchemas } from '../../validation/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { Controllers } from '../../controllers/index.js';

export const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(JoiSchemas.auth.registerUserSchema),
  ctrlWrapper(Controllers.authRegisterController),
);

authRouter.post(
  '/login',
  validateBody(JoiSchemas.auth.loginUserSchema),
  ctrlWrapper(Controllers.authLoginController),
);

authRouter.post('/refresh', ctrlWrapper(Controllers.authRefreshController));

authRouter.post('/logout', ctrlWrapper(Controllers.authLogoutController));

authRouter.post(
  '/request-reset-password',
  validateBody(JoiSchemas.auth.requestResetPasswordSchema),
  ctrlWrapper(Controllers.authRequestResetPasswordController),
);
