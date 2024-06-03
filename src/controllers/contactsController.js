import mongoose from 'mongoose';
import { HttpError } from '../utils/HttpError.js';
import { contactsServices } from '../services/contactsServices.js';
import { ResponseMaker } from '../utils/responseMaker.js';

const homeController = (req, res) => {
  res.json(ResponseMaker(200, 'Hello, this is my first backend`s answer!'));
};

const getAllContactsController = async (req, res) => {
  const result = await contactsServices.getAllContacts();
  res.json(ResponseMaker(200, 'Successfully found contacts!', result));
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(HttpError(404, `The ${contactId} has not validated!`));
  }
  const result = await contactsServices.getContactById(contactId);

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

const addNewContactController = async (req, res, next) => {
  const result = await contactsServices.addNewContact(req.body);
  res.json(ResponseMaker(201, 'Successfully created a contact!', result));
};

export const ctrl = {
  homeController,
  getAllContactsController,
  getContactByIdController,
  addNewContactController,
};
