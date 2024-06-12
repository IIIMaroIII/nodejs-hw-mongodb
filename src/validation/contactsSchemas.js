import joi from 'joi';

//  {
//     "name": "Yulia Shevchenko",
//     "phoneNumber": "+380000000001",
//     "email": "oleh1@example.com",
//     "isFavourite": false,
//     "contactType": "personal",
//     "createdAt": "2024-05-08T16:12:14.954151",
//     "updatedAt": "2024-05-08T16:12:14.954158"
//   },

const addNewContactSchema = joi.object({
  name: joi.string().min(3).max(20).required().messages({
    'string.base': '"name" should be a type of text',
    'string.empty': '"name" cannot be an empty field',
    'string.min': '"name" should have a minimum length of {#limit}',
    'string.max': '"name" should have a maximum length of {#limit}',
    'any.required': '"name" is a required field',
  }),
  phoneNumber: joi.string().min(3).max(20).required().messages({
    'string.base': '"phoneNumber" should be a type of text',
    'string.empty': '"phoneNumber" cannot be an empty field',
    'string.min': '"phoneNumber" should have a minimum length of {#limit}',
    'string.max': '"phoneNumber" should have a maximum length of {#limit}',
    'any.required': '"phoneNumber" is a required field',
  }),
  email: joi.string().min(3).max(30).email().messages({
    'string.base': '"email" should be a type of text',
    'string.empty': '"email" cannot be an empty field',
    'string.min': '"email" should have a minimum length of {#limit}',
    'string.max': '"email" should have a maximum length of {#limit}',
    'string.email': '"email" must be a valid email address',
  }),
  isFavourite: joi.boolean().default(false).messages({
    'boolean.base': '"isFavourite" should be a boolean value',
  }),
  contactType: joi.string().valid('personal', 'home').messages({
    'string.base': '"email" should be a type of text',
    'any.only': '"contactType" must be one of [personal, home]',
  }),
});

const patchContactSchema = joi.object({
  name: joi.string().min(3).max(20).messages({
    'string.base': '"name" should be a type of text',
    'string.empty': '"name" cannot be an empty field',
    'string.min': '"name" should have a minimum length of {#limit}',
    'string.max': '"name" should have a maximum length of {#limit}',
  }),
  phoneNumber: joi.string().min(3).max(20).messages({
    'string.base': '"phoneNumber" should be a type of text',
    'string.empty': '"phoneNumber" cannot be an empty field',
    'string.min': '"phoneNumber" should have a minimum length of {#limit}',
    'string.max': '"phoneNumber" should have a maximum length of {#limit}',
  }),
  email: joi.string().min(3).max(30).email().messages({
    'string.base': '"email" should be a type of text',
    'string.empty': '"email" cannot be an empty field',
    'string.min': '"email" should have a minimum length of {#limit}',
    'string.max': '"email" should have a maximum length of {#limit}',
    'string.email': '"email" must be a valid email address',
  }),
  isFavourite: joi.boolean().default(false).messages({
    'boolean.base': '"isFavourite" should be a boolean value',
  }),
  contactType: joi.string().valid('personal', 'home').messages({
    'string.base': '"email" should be a type of text',
    'any.only': '"contactType" must be one of [personal, home]',
  }),
});

export const contactsSchemas = {
  addNewContactSchema,
  patchContactSchema,
};
