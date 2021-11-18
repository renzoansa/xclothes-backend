import Boom from '@hapi/boom';

const refreshTokenDoesNotExistError = () =>
  Boom.unauthorized('Refresh token does not exits');

export default refreshTokenDoesNotExistError;
