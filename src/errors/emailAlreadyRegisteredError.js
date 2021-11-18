import Boom from '@hapi/boom';

const emailAlreadyRegisteredError = (email) =>
  Boom.conflict(`Email ${email} is already registered`);

export default emailAlreadyRegisteredError;
