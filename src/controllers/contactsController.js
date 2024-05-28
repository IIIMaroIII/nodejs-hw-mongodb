import mongoose from 'mongoose';
import { HttpError } from '../utils/HttpError.js';
import { Collection } from '../services/contacts.js';

const homePage = (req, res, next) => {
  try {
    res.json({
      status: '200',
      message: 'Hello, this is my first backend`s answer!',
    });
  } catch (error) {
    next(error);
  }
};

const contactsPage = async (req, res, next) => {
  try {
    const result = await Collection.getAllContacts();
    res.json({
      status: '200',
      message: 'Successfully found contacts!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const contactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return next(HttpError(404, `The ${contactId} has not validated!`));
    }
    const result = await Collection.getContactById(contactId);

    if (!result) {
      return next(
        HttpError(404, `The contact with ${contactId} was not found!`),
      );
    }
    res.json({
      status: '200',
      message: `Successfully found contact with ${contactId}}!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ctrl = {
  homePage,
  contactsPage,
  contactById,
};
