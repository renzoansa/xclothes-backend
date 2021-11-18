import Boom from '@hapi/boom';

export const handle = (_request, response) => {
  const { statusCode, payload } = Boom.notFound().output;
  response.status(statusCode).json(payload);
};
