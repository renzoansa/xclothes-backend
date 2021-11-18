import Boom from '@hapi/boom';

const clothingDoesNotExistError = (clothingId) => {
  return Boom.notFound(`Clothing with id ${clothingId} does not exist`);
};

export default clothingDoesNotExistError;
