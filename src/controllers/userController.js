import * as userService from '../services/userService';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import * as config from '../config';

const cookieConfig = {
  httpOnly: true,
  secure: config.isDevelopmentMode() ? false : true,
  expires: moment().add(7, 'days').toDate(),
};

export const createUser = async (request, response, next) => {
  try {
    const user = request.body;

    await userService.createUser(user);

    response.status(StatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
};

export const getAccessToken = async (request, response, next) => {
  try {
    const user = request.user;

    const { refreshToken, ...data } = await userService.getAccessToken(user);

    response
      .status(StatusCodes.OK)
      .cookie('refreshToken', refreshToken, cookieConfig)
      .json(data);
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (request, response, next) => {
  try {
    const refreshToken = request.cookies.refreshToken;

    const { refreshToken: newRefreshToken, ...data } =
      await userService.refreshAccessToken(refreshToken);

    response
      .status(StatusCodes.OK)
      .cookie('refreshToken', newRefreshToken, cookieConfig)
      .json(data);
  } catch (error) {
    next(error);
  }
};

export const revokeRefreshToken = async (request, response, next) => {
  try {
    const refreshToken = request.cookies.refreshToken;
    const user = request.user;

    await userService.revokeRefreshToken(refreshToken, user);

    response.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
