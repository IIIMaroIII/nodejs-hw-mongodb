import { COOKIE } from '../constants/constants.js';
import { Services } from '../services/index.js';
import { GenerateCookie } from '../utils/GenerateCookie.js';
import { HttpError } from '../utils/HttpError.js';
import { ResponseMaker } from '../utils/responseMaker.js';

export const authRegisterController = async (req, res, next) => {
  const user = await Services.registerUser(req.body);
  if (!user) return next(HttpError(500, 'Something went wrong!'));
  res.json(ResponseMaker(201, 'Successfully registered a user!', user));
};

export const authLoginController = async (req, res, next) => {
  const session = await Services.loginUser(req.body);
  if (!session) return next(HttpError(500, 'Something went wrong!'));

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'You`ve been successfully logged in!', {
      accessToken: session.accessToken,
    }),
  );
};

export const authRefreshController = async (req, res, next) => {
  console.log('req.cookies', req.cookies);
  const session = await Services.refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  if (!session) return next(HttpError(500, 'Something went wrong!'));

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'The session has been successfully refreshed!', {
      accessToken: session.accessToken,
    }),
  );
};

export const authLogoutController = async (req, res, next) => {
  if (!req.cookies.sessionId || !req.cookies.refreshToken)
    throw next(
      HttpError(
        401,
        'The session was not found, probably you`ve been logged out previously.',
      ),
    );
  await Services.logoutUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  res.clearCookie(COOKIE.SESSION_ID);
  res.clearCookie(COOKIE.REFRESH_TOKEN);
  res.status(204).send();
};
