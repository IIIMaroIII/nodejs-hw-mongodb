// import express from 'express';

// import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
// import { validateMongoId } from '../../middlewares/validateMongoId.js';
// import { validateBody } from '../../middlewares/validateBody.js';
// import { Controllers } from '../../controllers/Controllers.js';
// import { JoiSchemas } from '../../validation/JoiSchemas.js';
// import { authenticate } from '../../middlewares/authenticate.js';

// const contactsRouter = express.Router();

// contactsRouter.use('/contacts/:contactId', validateMongoId('contactId'));
// contactsRouter.use('/contacts', authenticate);

// contactsRouter.get('/', ctrlWrapper(Controllers.homeController));

// contactsRouter.get(
//   '/contacts',
//   ctrlWrapper(Controllers.getAllContactsController),
// );

// contactsRouter.get(
//   '/contacts/:contactId',
//   ctrlWrapper(Controllers.getContactByIdController),
// );

// contactsRouter.post(
//   '/contacts',
//   validateBody(JoiSchemas.contacts.newContactSchema),
//   ctrlWrapper(Controllers.addNewContactController),
// );

// contactsRouter.patch(
//   '/contacts/:contactId',
//   validateBody(JoiSchemas.contacts.patchSchema),
//   ctrlWrapper(Controllers.updateContactController),
// );

// contactsRouter.delete(
//   '/contacts/:contactId',
//   ctrlWrapper(Controllers.deleteContactController),
// );

// const authRouter = express.Router();

// authRouter.post(
//   '/auth/register',
//   validateBody(JoiSchemas.auth.registerUserSchema),
//   ctrlWrapper(Controllers.authRegisterController),
// );

// authRouter.post(
//   '/auth/login',
//   validateBody(JoiSchemas.auth.loginUserSchema),
//   ctrlWrapper(Controllers.authLoginController),
// );

// authRouter.post(
//   '/auth/refresh',
//   ctrlWrapper(Controllers.authRefreshController),
// );

// authRouter.post('/auth/logout', ctrlWrapper(Controllers.authLogoutController));

// export const Routers = {
//   contactsRouter,
//   authRouter,
// };
