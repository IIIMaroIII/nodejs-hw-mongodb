import express from 'express';
import { ctrl } from '../../controllers/contactsController.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

export const contactsRouters = express.Router();

contactsRouters.get('/', ctrlWrapper(ctrl.homePage));

contactsRouters.get('/contacts', ctrlWrapper(ctrl.contactsPage));

contactsRouters.get('/contacts/:contactId', ctrlWrapper(ctrl.contactById));
