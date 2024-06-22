import joi from 'joi';

const registerUserSchema = joi.object({
  name: joi.string().required().messages({
    'any.required': 'Name is required!',
  }),
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      'string.email':
        'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
      'any.required': 'Email address is required',
    }),
  password: joi.string().required().messages({
    'any.required': 'Password is required!',
  }),
});

const loginUserSchema = joi.object({
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      'string.email':
        'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
      'any.required': 'Email address is required',
    }),
  password: joi.string().required().messages({
    'any.required': 'Password is required!',
  }),
});

export const requestResetPasswordSchema = joi.object({
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      'string.email':
        'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
      'any.required': 'Email address is required',
    }),
});

export const auth = {
  registerUserSchema,
  loginUserSchema,
  requestResetPasswordSchema,
};
