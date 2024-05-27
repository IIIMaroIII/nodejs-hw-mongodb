import express from 'express';
import { ctrl } from '../../controllers/contactsController.js';

export const contactsRouters = express.Router();

contactsRouters.get('/', ctrl.homePage);

contactsRouters.get('/contacts', ctrl.contactsPage);

contactsRouters.get('/contacts/:contactId', ctrl.contactById);
