import mongoose from 'mongoose';
import { HttpError } from './HttpError.js';

export const validateMongooseId = (id, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(HttpError(404, `The ${id} has not validated!`));
  }
  return;
};
