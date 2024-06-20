// import joi from 'joi';

// const newContactSchema = joi.object({
//   name: joi.string().min(3).max(20).required().messages({
//     'string.base': '"name" should be a type of text',
//     'string.empty': '"name" cannot be an empty field',
//     'string.min': '"name" should have a minimum length of {#limit}',
//     'string.max': '"name" should have a maximum length of {#limit}',
//     'any.required': '"name" is a required field',
//   }),
//   userId: joi.string().messages({
//     'string.base': '"UserId" should be a type of text',
//     'any.required': 'UserId is a required field',
//   }),
//   phoneNumber: joi.string().min(3).max(20).required().messages({
//     'string.base': '"phoneNumber" should be a type of text',
//     'string.empty': '"phoneNumber" cannot be an empty field',
//     'string.min': '"phoneNumber" should have a minimum length of {#limit}',
//     'string.max': '"phoneNumber" should have a maximum length of {#limit}',
//     'any.required': '"phoneNumber" is a required field',
//   }),
//   email: joi.string().min(3).max(30).email().messages({
//     'string.base': '"email" should be a type of text',
//     'string.empty': '"email" cannot be an empty field',
//     'string.min': '"email" should have a minimum length of {#limit}',
//     'string.max': '"email" should have a maximum length of {#limit}',
//     'string.email': '"email" must be a valid email address',
//   }),
//   isFavourite: joi.boolean().default(false).messages({
//     'boolean.base': '"isFavourite" should be a boolean value',
//   }),
//   contactType: joi.string().valid('personal', 'home').messages({
//     'string.base': '"email" should be a type of text',
//     'any.only': '"contactType" must be one of [personal, home]',
//   }),
// });

// const patchSchema = joi.object({
//   name: joi.string().min(3).max(20).messages({
//     'string.base': '"name" should be a type of text',
//     'string.empty': '"name" cannot be an empty field',
//     'string.min': '"name" should have a minimum length of {#limit}',
//     'string.max': '"name" should have a maximum length of {#limit}',
//   }),
//   userId: joi.string().messages({
//     'string.base': 'userId should be a type of text',
//     'any.required': 'userId is a required field',
//   }),
//   phoneNumber: joi.string().min(3).max(20).messages({
//     'string.base': '"phoneNumber" should be a type of text',
//     'string.empty': '"phoneNumber" cannot be an empty field',
//     'string.min': '"phoneNumber" should have a minimum length of {#limit}',
//     'string.max': '"phoneNumber" should have a maximum length of {#limit}',
//   }),
//   email: joi.string().min(3).max(30).email().messages({
//     'string.base': '"email" should be a type of text',
//     'string.empty': '"email" cannot be an empty field',
//     'string.min': '"email" should have a minimum length of {#limit}',
//     'string.max': '"email" should have a maximum length of {#limit}',
//     'string.email': '"email" must be a valid email address',
//   }),
//   isFavourite: joi.boolean().default(false).messages({
//     'boolean.base': '"isFavourite" should be a boolean value',
//   }),
//   contactType: joi.string().valid('personal', 'home').messages({
//     'string.base': '"email" should be a type of text',
//     'any.only': '"contactType" must be one of [personal, home]',
//   }),
// });

// const registerUserSchema = joi.object({
//   name: joi.string().required().messages({
//     'any.required': 'Name is required!',
//   }),
//   email: joi
//     .string()
//     .trim()
//     .lowercase()
//     .email()
//     .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
//     .required()
//     .messages({
//       'string.email':
//         'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
//       'any.required': 'Email address is required',
//     }),
//   password: joi.string().required().messages({
//     'any.required': 'Password is required!',
//   }),
// });

// const loginUserSchema = joi.object({
//   email: joi
//     .string()
//     .trim()
//     .lowercase()
//     .email()
//     .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
//     .required()
//     .messages({
//       'string.email':
//         'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
//       'any.required': 'Email address is required',
//     }),
//   password: joi.string().required().messages({
//     'any.required': 'Password is required!',
//   }),
// });

// export const JoiSchemas = {
//   contacts: { newContactSchema, patchSchema },
//   auth: { registerUserSchema, loginUserSchema },
// };
