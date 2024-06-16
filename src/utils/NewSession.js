import { randomBytes } from 'crypto';
import { TOKEN_LIFETIME } from '../constants/constants.js';

export const NewSession = (userId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = TOKEN_LIFETIME.ACCESS_TOKEN_VALID_UNTIL;
  const refreshTokenValidUntil = TOKEN_LIFETIME.REFRESH_TOKEN_VALID_UNTIL;
  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};
