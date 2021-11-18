import Boom from '@hapi/boom';

const refreshTokenReusedError = () => Boom.unauthorized('Refresh token reused');

export default refreshTokenReusedError;
