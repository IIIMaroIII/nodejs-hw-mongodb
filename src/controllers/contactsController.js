import mongoose from 'mongoose';
import { HttpError } from '../utils/HttpError.js';
import { Collection } from '../services/contacts.js';
import { ResponseMaker } from '../utils/responseMaker.js';

const homePage = (req, res) => {
  res.json(ResponseMaker(200, 'Hello, this is my first backend`s answer!'));
};

const contactsPage = async (req, res) => {
  const result = await Collection.getAllContacts();
  res.json(ResponseMaker(200, 'Successfully found contacts!', result));
};

const contactById = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(HttpError(404, `The ${contactId} has not validated!`));
  }
  const result = await Collection.getContactById(contactId);

  if (!result) {
    return next(HttpError(404, `The contact with ${contactId} was not found!`));
  }
  res.json(
    ResponseMaker(
      200,
      `Successfully found contact with ${contactId}}!`,
      result,
    ),
  );
};

export const ctrl = {
  homePage,
  contactsPage,
  contactById,
};
