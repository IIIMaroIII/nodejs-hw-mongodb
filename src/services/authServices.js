import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Models } from '../db/models/index.js';
import { HttpError } from '../utils/HttpError.js';
import { NewSession } from '../utils/NewSession.js';
import { env } from '../utils/env.js';
import { ENV_VARS, JWT, SMTP } from '../constants/constants.js';
import { sendEmail } from '../utils/sendMail.js';

export const registerUser = async (payload) => {
  const userExists = await Models.UserModel.findOne({ email: payload.email });
  if (userExists) throw HttpError(409, 'Email has had already in use!');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  console.log('encryptedPassword', encryptedPassword);

  return await Models.UserModel.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await Models.UserModel.findOne({ email: payload.email });
  if (!user) throw HttpError(404, 'User was not found!');

  const isPasswordEqual = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordEqual) throw HttpError(401, 'Unauthorized!');

  await Models.SessionModel.deleteOne({ userId: user._id });

  return await Models.SessionModel.create(NewSession(user._id));
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Models.SessionModel.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw HttpError(401, 'The session was not found!');

  const isTokenExpired = new Date() > session.refreshTokenValidUntil;
  if (isTokenExpired) throw HttpError(401, 'The session token has expired!');

  await Models.SessionModel.findOneAndDelete({
    _id: sessionId,
    refreshToken,
  });
  const newSession = NewSession(session.userId);

  return await Models.SessionModel.create({ ...newSession });
};

export const logoutUser = async ({ sessionId, refreshToken }) => {
  if (!sessionId) throw HttpError(400, 'The session data was not provided!');
  await Models.SessionModel.deleteOne({ _id: sessionId, refreshToken });
};
export const requestResetPassword = async (email) => {
  const user = await Models.UserModel.findOne({ email });
  if (!user) throw HttpError(404, 'The user hasn`t been found!');

  const resetToken = jwt.sign({ sub: user.id, email }, env(JWT.SECRET), {
    expiresIn: '5m',
  });

  try {
    await sendEmail({
      from: env(SMTP.FROM),
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${env(
        ENV_VARS.APP_DOMAIN,
      )}/reset-password?token=${resetToken}">here</a> to reset your password!</p>`,
    });
  } catch (error) {
    console.log(error);
    throw HttpError(500, 'Failed to send the email, please try again later');
  }
};

export const resetPwd = async (payload) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, env(JWT.SECRET));

    const user = await Models.UserModel.findOne({
      email: entries.email,
      _id: entries.sub,
    });
    if (!user) throw HttpError(404, 'The user hasn`t been found!');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    await Models.UserModel.updateOne(
      { _id: user.id },
      { password: encryptedPassword },
    );

    await Models.SessionModel.deleteOne({ userId: user.id });
  } catch (error) {
    if (error instanceof Error)
      throw HttpError(401, 'The token is expired or invalid');
    throw error;
  }
};
