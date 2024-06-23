import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  requestResetPassword,
  resetPwd,
} from './authServices.js';
import {
  addNewContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from './contactServices.js';

export const Services = {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContact,
  deleteContact,
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  requestResetPassword,
  resetPwd,
};
