import { ContactsCollection } from '../db/models/contacts.js';

const getAllContacts = async () => await ContactsCollection.find();

const getContactById = async (id) =>
  (await ContactsCollection.findById(id)) || null;

export const Collection = {
  getAllContacts,
  getContactById,
};
