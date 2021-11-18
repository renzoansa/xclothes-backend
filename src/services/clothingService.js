import clothingDoesNotExistError from '../errors/clothingDoesNotExistError';
import Clothing from '../models/Clothing';

export const getById = async (id) => {
  const clothing = await Clothing.findOne({ _id: id });

  if (!clothing) throw clothingDoesNotExistError(clothing._id);

  return {
    id: clothing._id,
    name: clothing.name,
    priceInDollarCents: clothing.priceInDollarCents,
    category: clothing.category,
    image: clothing.image,
  };
};
