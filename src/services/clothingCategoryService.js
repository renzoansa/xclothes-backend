import ClothingCategory from '../models/ClothingCategory';
import Clothing from '../models/Clothing';

export const getAll = async () => {
  const clothingCategories = await ClothingCategory.find();
  return clothingCategories.map((clothingCategory) => ({
    id: clothingCategory._id,
    name: clothingCategory.name,
  }));
};

export const getAllClothesByCategory = async (clothingCategoryId) => {
  const clothes = await Clothing.find({ category: clothingCategoryId });

  return clothes.map((clothing) => ({
    id: clothing._id,
    name: clothing.name,
    priceInDollarCents: clothing.priceInDollarCents,
    category: clothing.category,
    image: clothing.image,
  }));
};
