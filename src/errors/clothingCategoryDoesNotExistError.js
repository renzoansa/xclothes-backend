import Boom from '@hapi/boom';

const clothingCategoryDoesNotExistError = (clothingCategoryId) => {
  throw Boom.notFound(`Clothing with id ${clothingCategoryId} does not exist`);
};

export default clothingCategoryDoesNotExistError;
