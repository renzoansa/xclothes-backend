import Boom from '@hapi/boom';

const invalidAccessTokenError = () => Boom.unauthorized('Invalid access token');

export default invalidAccessTokenError;
