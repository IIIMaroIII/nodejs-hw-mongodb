import { HttpError } from './HttpError.js';

export const handleIdWasntFound = (result, id, next) => {
  if (result) return;

  return next(HttpError(404, `The contact with ${id} was not found!`));
};
