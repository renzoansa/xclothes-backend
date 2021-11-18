import Boom from '@hapi/boom';

const refreshTokenDoesNotBelongToAccessTokenOwnerError = () =>
  Boom.unauthorized('Refresh token does not belong to access token owner');

export default refreshTokenDoesNotBelongToAccessTokenOwnerError;
