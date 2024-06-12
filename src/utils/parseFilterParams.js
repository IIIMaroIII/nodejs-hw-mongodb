import { CONTACT_TYPE } from '../constants/constants.js';

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = [CONTACT_TYPE.HOME, CONTACT_TYPE.PERSONAL].includes(
    contactType,
  );
  if (isContactType) return contactType;
};

const parseIsFavorite = (favoriteQuery) => {
  const isString = typeof favoriteQuery === 'string';
  if (!isString) return;
  const isFavoriteKnown = favoriteQuery === 'false' || favoriteQuery === 'true';
  if (isFavoriteKnown) return favoriteQuery;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavorite } = query;
  const parsedContactType = parseContactType(contactType);
  const parsedIsFavorite = parseIsFavorite(isFavorite);
  return {
    contactType: parsedContactType,
    isFavorite: parsedIsFavorite,
  };
};
