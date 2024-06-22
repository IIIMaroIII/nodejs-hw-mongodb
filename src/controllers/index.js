import {
  authLoginController,
  authLogoutController,
  authRefreshController,
  authRegisterController,
  authRequestResetPasswordController,
} from './authController.js';
import {
  addNewContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  homeController,
  updateContactController,
} from './contactsController.js';

export const Controllers = {
  homeController,
  getAllContactsController,
  getContactByIdController,
  addNewContactController,
  updateContactController,
  deleteContactController,
  authRegisterController,
  authLoginController,
  authRefreshController,
  authLogoutController,
  authRequestResetPasswordController,
};
