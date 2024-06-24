import { Services } from '../services/index.js';
import { HttpError } from '../utils/HttpError.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const homeController = (req, res) => {
  res.json(
    ResponseMaker(200, 'Hey, what`s been up? This is my first backend`s!'),
  );
};

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const result = await Services.getAllContacts({
    userId: req.user.id,
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });
  res.json(ResponseMaker(200, 'Successfully found contacts!', result));
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Services.getContactById({
    _id: contactId,
    userId: req.user.id,
  });

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

export const addNewContactController = async (req, res, next) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await Services.addNewContact({
    ...req.body,
    userId: req.user.id,
    photo: photoUrl,
  });

  if (!result) return next(HttpError(500, 'Something went wrong!'));
  res
    .status(201)
    .json(ResponseMaker(201, 'Successfully created a contact!', result));
};

export const updateContactController = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  const { id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await Services.updateContact(
    { contactId, userId },
    { ...body, photo: photoUrl },
  );

  if (!result) {
    return next(HttpError(404, `The contact with ${contactId} was not found!`));
  }

  res.json(ResponseMaker(200, 'Successfully patched a contact!', result));
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Services.deleteContact({
    _id: contactId,
    userId: req.user.id,
  });

  if (!result) {
    return next(HttpError(404, `The contact with ${contactId} was not found!`));
  }

  res.status(204).send();
};
