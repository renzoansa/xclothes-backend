import Boom from '@hapi/boom';

const expiredRefreshTokenError = () =>
  Boom.unauthorized('Expired refresh token');

export default expiredRefreshTokenError;
