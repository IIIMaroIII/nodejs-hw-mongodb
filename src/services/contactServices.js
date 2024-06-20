import { CONTACT, SORT_ORDER } from '../constants/constants.js';
import { Models } from '../db/models/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 3,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = Models.ContactModel.find({ userId });

  if (filter.contactType) {
    return contactsQuery.where(CONTACT.CONTACT_TYPE).equals(filter.contactType);
  }
  if (filter.isFavorite) {
    return contactsQuery.where(CONTACT.IS_FAVORITE).equals(filter.isFavorite);
  }
  const [contacts, contactsCount] = await Promise.all([
    Models.ContactModel.find({ userId })
      .skip(skip)
      .limit(perPage)
      .merge(contactsQuery)
      .sort({ [sortBy]: sortOrder })
      .exec(),
    Models.ContactModel.countDocuments({ userId }).exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (payload) =>
  (await Models.ContactModel.findOne(payload)) || null;

export const addNewContact = async (payload) =>
  await Models.ContactModel.create(payload);

export const updateContact = async (id, payload, options = {}) =>
  await Models.ContactModel.findByIdAndUpdate(id, payload, {
    new: true,
    ...options,
  });

export const deleteContact = async (id) =>
  await Models.ContactModel.findByIdAndDelete(id);
