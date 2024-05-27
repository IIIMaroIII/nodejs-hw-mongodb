import express from 'express';
import { getAllContacts, getContactById } from '../../services/contacts.js';
import mongoose from 'mongoose';
import { HttpError } from '../../utils/HttpError.js';

export const contactsRouter = express.Router();

contactsRouter.get('/', (req, res, next) => {
  try {
    res.json({
      status: '200',
      message: 'Hello, this is my first backend`s answer!',
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.get('/contacts', async (req, res, next) => {
  try {
    const result = await getAllContacts();
    res.json({
      status: '200',
      message: 'Successfully found contacts!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.get('/contacts/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw HttpError(404, `The contact with ${contactId} was not found!`);
    }
    const result = await getContactById(contactId);
    res.json({
      status: '200',
      message: `Successfully found contact with ${contactId}}!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});
