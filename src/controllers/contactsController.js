import mongoose from 'mongoose';
import { HttpError } from '../utils/HttpError.js';
import { contactsServices } from '../services/contactsServices.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { validateMongooseId } from '../utils/validateMongooseId.js';
import { handleIdWasntFound } from '../utils/handleIdWasntFound.js';

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

const addNewContactController = async (req, res) => {
  const result = await contactsServices.addNewContact(req.body);
  res.json(ResponseMaker(201, 'Successfully created a contact!', result));
};

const updateContactController = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;

  validateMongooseId(contactId, next);

  const result = await contactsServices.updateContact(contactId, body);

  handleIdWasntFound(result, contactId, next);

  res.json(ResponseMaker(200, 'Successfully patched a contact!', result));
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  validateMongooseId(contactId, next);

  const result = await contactsServices.deleteContact(contactId);
  console.log('_________result', result);

  if (!result) {
    return next(HttpError(404, `The contact with ${contactId} was not found!`));
  }

  res.json(ResponseMaker(204, 'Contact has been successfully deleted!'));
};

export const ctrl = {
  homeController,
  getAllContactsController,
  getContactByIdController,
  addNewContactController,
  updateContactController,
  deleteContactController,
};
