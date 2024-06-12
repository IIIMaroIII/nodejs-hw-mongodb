import { CONTACT, SORT_ORDER } from '../constants/constants.js';
import { ContactCollection } from '../db/models/ContactCollection.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAllContacts = async ({
  page = 1,
  perPage = 3,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();

  if (filter.contactType) {
    return contactsQuery.where(CONTACT.CONTACT_TYPE).equals(filter.contactType);
  }
  if (filter.isFavorite) {
    return contactsQuery.where(CONTACT.IS_FAVORITE).equals(filter.isFavorite);
  }
  const [contacts, contactsCount] = await Promise.all([
    ContactCollection.find()
      .skip(skip)
      .limit(perPage)
      .merge(contactsQuery)
      .sort({ [sortBy]: sortOrder })
      .exec(),
    ContactCollection.countDocuments().exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

const getContactById = async (id) =>
  (await ContactCollection.findById(id)) || null;

const addNewContact = async (payload) =>
  await ContactCollection.create(payload);

const updateContact = async (id, payload, options = {}) =>
  await ContactCollection.findByIdAndUpdate(id, payload, {
    new: true,
    ...options,
  });

const deleteContact = async (id) =>
  await ContactCollection.findByIdAndDelete(id);

export const contactsServices = {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContact,
  deleteContact,
};
