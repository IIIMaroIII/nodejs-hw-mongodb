import bcrypt from 'bcrypt';
import { CONTACT, SORT_ORDER } from '../constants/constants.js';
import { Models } from '../db/models/Models.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { HttpError } from '../utils/HttpError.js';
import { NewSession } from '../utils/newSession.js';

const getAllContacts = async ({
  page = 1,
  perPage = 3,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = Models.ContactModel.find();

  if (filter.contactType) {
    return contactsQuery.where(CONTACT.CONTACT_TYPE).equals(filter.contactType);
  }
  if (filter.isFavorite) {
    return contactsQuery.where(CONTACT.IS_FAVORITE).equals(filter.isFavorite);
  }
  const [contacts, contactsCount] = await Promise.all([
    Models.ContactModel.find()
      .skip(skip)
      .limit(perPage)
      .merge(contactsQuery)
      .sort({ [sortBy]: sortOrder })
      .exec(),
    Models.ContactModel.countDocuments().exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

const getContactById = async (id) =>
  (await Models.ContactModel.findById(id)) || null;

const addNewContact = async (payload) =>
  await Models.ContactModel.create(payload);

const updateContact = async (id, payload, options = {}) =>
  await Models.ContactModel.findByIdAndUpdate(id, payload, {
    new: true,
    ...options,
  });

const deleteContact = async (id) =>
  await Models.ContactModel.findByIdAndDelete(id);

const registerUser = async (payload) => {
  const userExists = await Models.UserModel.findOne({ email: payload.email });
  if (userExists) throw HttpError(409, 'Email has had already in use!');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  console.log('encryptedPassword', encryptedPassword);

  return await Models.UserModel.create({
    ...payload,
    password: encryptedPassword,
  });
};

const loginUser = async (payload) => {
  const user = await Models.UserModel.findOne({ email: payload.email });
  if (!user) throw HttpError(404, 'User was not found!');

  const isPasswordEqual = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordEqual) throw HttpError(401, 'Unauthorized!');

  await Models.SessionModel.deleteOne({ userId: user._id });

  return await Models.SessionModel.create(NewSession(user._id));
};

export const Services = {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContact,
  deleteContact,
  registerUser,
  loginUser,
};
