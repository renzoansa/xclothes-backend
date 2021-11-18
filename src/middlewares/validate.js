import Boom from '@hapi/boom';

const validate =
  (validator, place = 'body') =>
  async (request, _response, next) => {
    try {
      request[place] = await validator.validateAsync(request[place]);
      next();
    } catch (error) {
      next(Boom.badRequest(error));
    }
  };

export default validate;
