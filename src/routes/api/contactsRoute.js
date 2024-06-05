import express from 'express';
import { ctrl } from '../../controllers/contactsController.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

export const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(ctrl.homeController));

contactsRouter.get('/contacts', ctrlWrapper(ctrl.getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(ctrl.getContactByIdController),
);

contactsRouter.post('/contacts', ctrlWrapper(ctrl.addNewContactController));

contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(ctrl.updateContactController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(ctrl.deleteContactController),
);
