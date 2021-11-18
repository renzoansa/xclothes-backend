import Boom from '@hapi/boom';

const refreshTokenRevokedError = () =>
  Boom.unauthorized('Refresh token revoked');

export default refreshTokenRevokedError;
