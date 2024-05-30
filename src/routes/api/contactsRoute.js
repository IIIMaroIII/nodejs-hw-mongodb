import express from 'express';
import { ctrl } from '../../controllers/contactsController.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

export const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(ctrl.homeController));

contactsRouter.get('/contacts', ctrlWrapper(ctrl.allContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(ctrl.contactByIdController),
);
