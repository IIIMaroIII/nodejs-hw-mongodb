import path from 'path';

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  APP_DOMAIN: 'APP_DOMAIN',
};

export const DIR = {
  TEMP: path.join(process.cwd(), 'temp'),
  UPLOAD: path.join(process.cwd(), 'uploads'),
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
  HOST: 'SMTP_HOST',
  PORT: 'SMTP_PORT',
  USER: 'SMTP_USER',
  PASSWORD: 'SMTP_PASSWORD',
  FROM: 'SMTP_FROM',
};

export const JWT = {
  SECRET: 'JWT_SECRET',
};

export const CLOUDINARY = {
  URL: 'CLOUDINARY_URL',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
  NAME: 'CLOUDINARY_NAME',
  ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
};

export const SWAGGER = {
  PATH: path.join(process.cwd(), 'docs', 'swagger.json'),
};

// {
//     "status": 200,
//     "message": "The contacts have been successfully found!",
//     "data": {
//         "data": [
//             {
//                 "_id": "6678dcf78d2bdc5c2032589a",
//                 "name": "asdasdasdasd",
//                 "userId": "6678a99a55902e6520785232",
//                 "phoneNumber": "380999999",
//                 "isFavourite": true,
//                 "photo": "http://localhost:3000/auth/uploads/1719199980781_1228014.png",
//                 "createdAt": "2024-06-24T02:41:59.399Z",
//                 "updatedAt": "2024-06-28T03:56:08.548Z",
//                 "email": "ivan@example.com"
//             },
//             {
//                 "_id": "6678e9c4e4e253ee882b35ae",
//                 "name": "Ivan Durak",
//                 "userId": "6678a99a55902e6520785232",
//                 "phoneNumber": "380",
//                 "isFavourite": false,
//                 "photo": "https://res.cloudinary.com/drdqpgk8m/image/upload/v1719200191/mnpo9t3bttskasgd83cf.jpg",
//                 "createdAt": "2024-06-24T03:36:36.564Z",
//                 "updatedAt": "2024-06-28T03:56:50.023Z",
//                 "email": "durak@example.com"
//             }
//         ],
//         "page": 1,
//         "perPage": 10,
//         "totalItems": 2,
//         "totalPages": 1,
//         "hasNextPage": false,
//         "hasPreviousPage": false
//     }
// }
