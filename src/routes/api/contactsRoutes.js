import express from 'express';

import {
  contactById,
  contactsPage,
  homePage,
} from '../../controllers/contactsController.js';

export const contactsRouters = express.Router();

contactsRouters.get('/', homePage);

contactsRouters.get('/contacts', contactsPage);

contactsRouters.get('/contacts/:contactId', contactById);
