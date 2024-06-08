import { ContactCollection } from '../db/models/ContactCollection.js';

const getAllContacts = async () => await ContactCollection.find();

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
