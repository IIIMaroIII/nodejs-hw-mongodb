import { HttpError } from '../utils/HttpError.js';
import { Services } from '../services/Services.js';
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

  const result = await Services.getAllContacts({
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

  const result = await Services.getContactById(contactId);

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
  const result = await Services.addNewContact(req.body);
  if (!result) return next(HttpError(500, 'Something went wrong!'));
  res.json(ResponseMaker(201, 'Successfully created a contact!', result));
};

const updateContactController = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;

  const result = await Services.updateContact(contactId, body);

  if (!result) {
    return next(HttpError(404, `The contact with ${contactId} was not found!`));
  }

  res.json(ResponseMaker(200, 'Successfully patched a contact!', result));
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Services.deleteContact(contactId);

  if (!result) {
    return next(HttpError(404, `The contact with ${contactId} was not found!`));
  }

  res.json(ResponseMaker(204, 'Contact has been successfully deleted!'));
};

const authRegisterController = async (req, res, next) => {
  const user = await Services.registerUser(req.body);
  if (!user) return next(HttpError(500, 'Something went wrong!'));
  res.json(ResponseMaker(201, 'Successfully registered a user!', user));
};

const authLoginController = async (req, res, next) => {
  const user = await Services.loginUser(req.body);
  if (!user) return next(HttpError(500, 'Something went wrong!'));
  res.json(ResponseMaker(200, 'You`ve been successfully logged in!', user));
};

const authLogoutController = async (req, res, next) => {};

export const Controllers = {
  homeController,
  getAllContactsController,
  getContactByIdController,
  addNewContactController,
  updateContactController,
  deleteContactController,
  authRegisterController,
  authLoginController,
  authLogoutController,
};
