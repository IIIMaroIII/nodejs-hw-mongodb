export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const CONTACT = {
  ID: '_id',
  NAME: 'name',
  PHONE_NUMBER: 'phoneNumber',
  EMAIL: 'email',
  IS_FAVORITE: 'isFavourite',
  CONTACT_TYPE: 'contactType',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};
export const CONTACT_TYPE = {
  HOME: 'home',
  PERSONAL: 'personal',
};

export const TIME_DURATION = {
  FIFTEEN_MIN: 15 * 60 * 1000,
  THIRTY_DAYS: 30 * 24 * 60 * 60 * 1000,
};

export const COOKIE = {
  REFRESH_TOKEN: 'refreshToken',
  SESSION_ID: 'sessionId',
  EXPIRES: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
};

export const AUTHENTICATE = {
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
};
export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
