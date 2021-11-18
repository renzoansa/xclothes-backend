import Boom from '@hapi/boom';

const emailOrPasswordIncorrectError = () =>
  Boom.unauthorized('Email or Password Incorrect');

export default emailOrPasswordIncorrectError;
