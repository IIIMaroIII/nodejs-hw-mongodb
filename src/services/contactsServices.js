import { ContactCollection } from '../db/models/ContactCollection.js';

const getAllContacts = async () => await ContactCollection.find();

const getContactById = async (id) =>
  (await ContactCollection.findById(id)) || null;

export const contactsServices = {
  getAllContacts,
  getContactById,
};
