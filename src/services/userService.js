import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import * as config from '../config';
import accessTokenDoesNotBelongToAnyUserError from '../errors/accessTokenDoesNotBelongToAnyUserError';
import emailAlreadyRegisteredError from '../errors/emailAlreadyRegisteredError';
import expiredRefreshTokenError from '../errors/expiredRefreshTokenError';
import invalidAccessTokenError from '../errors/invalidAccessTokenError';
import emailOrPasswordIncorrectError from '../errors/mailOrPasswordIncorrectError';
import refreshTokenDoesNotExistError from '../errors/refreshTokenDoesNotExistsError';
import refreshTokenReusedError from '../errors/refreshTokenReusedError';
import refreshTokenRevokedError from '../errors/refreshTokenRevokedError';
import refreshTokenDoesNotBelongToAccessTokenOwner from '../errors/refreshTokenDoesNotBelongToAccessTokenOwnerError';
import RefreshToken from '../models/RefreshToken';
import User from '../models/User';

const hashPassword = (password) => {
  const rounds = 10;
  return bcrypt.hash(password, rounds);
};

export const createUser = async (user) => {
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) {
    throw emailAlreadyRegisteredError(user.email);
  }

  const newUser = new User();

  newUser.name = user.name;
  newUser.email = user.email;
  newUser.passwordHash = await hashPassword(user.password);

  await newUser.save();
};

const comparePassword = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw emailOrPasswordIncorrectError();
  }

  const matchPassword = await comparePassword(password, user.passwordHash);

  if (!matchPassword) {
    throw emailOrPasswordIncorrectError();
  }

  return user;
};

const secondsForAccessTokenToExpire = 900;

const generateAccessToken = (user) => {
  return jwt.sign({ sub: user._id }, config.getAccessTokenSecret(), {
    expiresIn: `${secondsForAccessTokenToExpire}s`,
  });
};

const generateRefreshToken = (user) => {
  return new RefreshToken({
    user: user._id,
    token: crypto.randomBytes(40).toString('hex'),
    expirationDate: moment().add(7, 'days').toDate(),
  });
};

export const getAccessToken = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await refreshToken.save();

  return {
    accessToken: {
      token: accessToken,
      secondsToExpire: secondsForAccessTokenToExpire,
    },
    refreshToken: refreshToken.token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

const getRefreshTokenByToken = (token) => {
  return RefreshToken.findOne({ token });
};

const revokeRefreshTokenByToken = async (token) => {
  const refreshToken = await getRefreshTokenByToken(token);
  refreshToken.revocationDate = Date.now();
  await refreshToken.save();
  return refreshToken;
};

const revokeSubsequentRefreshTokens = async (refreshToken) => {
  let replacementToken = refreshToken.replacementToken;
  do {
    const replacementRefreshToken = await revokeRefreshTokenByToken(
      replacementToken
    );
    replacementToken = replacementRefreshToken.replacementToken;
  } while (replacementToken);
};

const validateRefreshTokenToRefreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw refreshTokenDoesNotExistError();

  if (refreshToken.replacementToken) {
    await revokeSubsequentRefreshTokens(refreshToken);
    throw refreshTokenReusedError();
  }
  if (refreshToken.revocationDate) throw refreshTokenRevokedError();
  if (refreshToken.isExpired) throw expiredRefreshTokenError();
};

export const refreshAccessToken = async (token) => {
  const refreshToken = await getRefreshTokenByToken(token).populate('user');

  await validateRefreshTokenToRefreshAccessToken(refreshToken);

  const newRefreshToken = generateRefreshToken(refreshToken.user);

  refreshToken.revocationDate = Date.now();
  refreshToken.replacementToken = newRefreshToken.token;

  await refreshToken.save();
  await newRefreshToken.save();

  const accessToken = generateAccessToken(refreshToken.user);

  return {
    refreshToken: newRefreshToken.token,
    accessToken: {
      token: accessToken,
      secondsToExpire: secondsForAccessTokenToExpire,
    },
    user: {
      id: refreshToken.user._id,
      email: refreshToken.user.email,
      name: refreshToken.user.name,
    },
  };
};

const verifyAccessToken = (accessToken) =>
  jwt.verify(accessToken, config.getAccessTokenSecret());

export const authenticateUserWithAccessToken = async (accessToken) => {
  let accessTokenPayload;

  try {
    accessTokenPayload = verifyAccessToken(accessToken);
  } catch (error) {
    throw invalidAccessTokenError();
  }

  const user = await User.findById(accessTokenPayload.sub);

  if (!user) throw accessTokenDoesNotBelongToAnyUserError();

  return user;
};

export const revokeRefreshToken = async (token, user) => {
  const refreshToken = await getRefreshTokenByToken(token);

  if (!refreshToken) throw refreshTokenDoesNotExistError();

  if (!refreshToken.user.equals(user._id))
    throw refreshTokenDoesNotBelongToAccessTokenOwner();

  refreshToken.revocationDate = Date.now();
  await refreshToken.save();
};
