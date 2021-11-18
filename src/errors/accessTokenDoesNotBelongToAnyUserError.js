import Boom from '@hapi/boom';

const accessTokenDoesNotBelongToAnyUserError = () =>
  Boom.unauthorized('Access token does not belong to any user');

export default accessTokenDoesNotBelongToAnyUserError;
