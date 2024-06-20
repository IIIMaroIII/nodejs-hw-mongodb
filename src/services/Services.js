// import bcrypt from 'bcrypt';
// import { CONTACT, SORT_ORDER } from '../constants/constants.js';
// import { Models } from '../db/models/Models.js';
// import { calculatePaginationData } from '../utils/calculatePaginationData.js';
// import { HttpError } from '../utils/HttpError.js';
// import { NewSession } from '../utils/NewSession.js';

// const getAllContacts = async ({
//   userId,
//   page = 1,
//   perPage = 3,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
// }) => {
//   const skip = (page - 1) * perPage;

//   const contactsQuery = Models.ContactModel.find({ userId });

//   if (filter.contactType) {
//     return contactsQuery.where(CONTACT.CONTACT_TYPE).equals(filter.contactType);
//   }
//   if (filter.isFavorite) {
//     return contactsQuery.where(CONTACT.IS_FAVORITE).equals(filter.isFavorite);
//   }
//   const [contacts, contactsCount] = await Promise.all([
//     Models.ContactModel.find({ userId })
//       .skip(skip)
//       .limit(perPage)
//       .merge(contactsQuery)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//     Models.ContactModel.countDocuments().exec(),
//   ]);

//   const paginationData = calculatePaginationData(contactsCount, page, perPage);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// const getContactById = async (payload) =>
//   (await Models.ContactModel.findOne(payload)) || null;

// const addNewContact = async (payload) =>
//   await Models.ContactModel.create(payload);

// const updateContact = async (id, payload, options = {}) =>
//   await Models.ContactModel.findByIdAndUpdate(id, payload, {
//     new: true,
//     ...options,
//   });

// const deleteContact = async (id) =>
//   await Models.ContactModel.findByIdAndDelete(id);

// const registerUser = async (payload) => {
//   const userExists = await Models.UserModel.findOne({ email: payload.email });
//   if (userExists) throw HttpError(409, 'Email has had already in use!');

//   const encryptedPassword = await bcrypt.hash(payload.password, 10);
//   console.log('encryptedPassword', encryptedPassword);

//   return await Models.UserModel.create({
//     ...payload,
//     password: encryptedPassword,
//   });
// };

// const loginUser = async (payload) => {
//   const user = await Models.UserModel.findOne({ email: payload.email });
//   if (!user) throw HttpError(404, 'User was not found!');

//   const isPasswordEqual = await bcrypt.compare(payload.password, user.password);
//   if (!isPasswordEqual) throw HttpError(401, 'Unauthorized!');

//   await Models.SessionModel.deleteOne({ userId: user._id });

//   return await Models.SessionModel.create(NewSession(user._id));
// };

// const refreshUsersSession = async ({ sessionId, refreshToken }) => {
//   const session = await Models.SessionModel.findOne({
//     _id: sessionId,
//     refreshToken,
//   });
//   if (!session) throw HttpError(401, 'The session was not found!');

//   const isTokenExpired = new Date() > session.refreshTokenValidUntil;
//   if (isTokenExpired) throw HttpError(401, 'The session token has expired!');

//   await Models.SessionModel.findOneAndDelete({
//     _id: sessionId,
//     refreshToken,
//   });
//   const newSession = NewSession(session.userId);

//   return await Models.SessionModel.create({ ...newSession });
// };

// const logoutUser = async ({ sessionId, refreshToken }) => {
//   if (!sessionId) throw HttpError(400, 'The session data was not provided!');
//   await Models.SessionModel.deleteOne({ _id: sessionId, refreshToken });
// };

// export const Services = {
//   getAllContacts,
//   getContactById,
//   addNewContact,
//   updateContact,
//   deleteContact,
//   registerUser,
//   loginUser,
//   logoutUser,
//   refreshUsersSession,
// };
