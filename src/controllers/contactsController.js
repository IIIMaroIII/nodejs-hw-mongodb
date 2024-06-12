import { HttpError } from '../utils/HttpError.js';
import { contactsServices } from '../services/contactsServices.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

const homeController = (req, res) => {
  res.json(
    ResponseMaker(
      200,
      'Hey, what`s been up? This is my first backend`s answer!',
    ),
  );
};

const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  console.log('filter', filter);

  const result = await contactsServices.getAllContacts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });
  res.json(ResponseMaker(200, 'Successfully found contacts!', result));
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

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

  const result = await contactsServices.updateContact(contactId, body);

  if (!result) {
    return next(HttpError(404, `The contact with ${contactId} was not found!`));
  }

  res.json(ResponseMaker(200, 'Successfully patched a contact!', result));
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactsServices.deleteContact(contactId);

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
