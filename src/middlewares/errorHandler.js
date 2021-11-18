import Boom from '@hapi/boom';
import * as config from '../config';

export const wrapGenericErrors = (error, _request, _response, next) => {
  if (!error.isBoom) {
    return next(Boom.badImplementation(error));
  }
  return next(error);
};

const withErrorStack = (payload, errorStack) =>
  config.isDevelopmentMode() ? { ...payload, stack: errorStack } : payload;

export const logErrors = (error, _request, _response, next) => {
  console.error(error);
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const handle = (error, _request, response, _next) => {
  const { statusCode, payload } = error.output;
  response.status(statusCode).json(withErrorStack(payload, error.stack));
};
