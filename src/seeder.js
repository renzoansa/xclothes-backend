import Clothing from './models/Clothing';
import ClothingCategory from './models/ClothingCategory';

const seedClothingCategories = async () => {
  const [
    hatsClothingCategory,
    sneakersClothingCategory,
    jacketsClothingCategory,
  ] = await Promise.all([
    ClothingCategory.findOneAndUpdate(
      { name: 'hats' },
      {},
      { upsert: true, returnDocument: 'after' }
    ),
    ClothingCategory.findOneAndUpdate(
      { name: 'sneakers' },
      {},
      { upsert: true, returnDocument: 'after' }
    ),
    ClothingCategory.findOneAndUpdate(
      { name: 'jackets' },
      {},
      { upsert: true, returnDocument: 'after' }
    ),
  ]);

  return {
    hatsClothingCategory,
    sneakersClothingCategory,
    jacketsClothingCategory,
  };
};

const seedHats = async (hatsCategory) => {
  await Promise.all([
    Clothing.findOneAndUpdate(
      { name: 'Brown brim' },
      {
        priceInDollarCents: 2500,
        category: hatsCategory._id,
        image: 'https://i.ibb.co/kMsrWJw/brown-brim.jpg',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Blue beanie' },
      {
        priceInDollarCents: 1800,
        category: hatsCategory._id,
        image: 'https://i.ibb.co/KWsS18g/blue-beanie.webp',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Brown cowboy' },
      {
        priceInDollarCents: 3500,
        category: hatsCategory._id,
        image: 'https://i.ibb.co/brRFbKK/brown-cowboy.jpg',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Grey brim' },
      {
        priceInDollarCents: 2500,
        category: hatsCategory._id,
        image: 'https://i.ibb.co/DpYCvxq/grey-brim.webp',
      },
      { upsert: true }
    ),
  ]);
};

const seedSneakers = async (sneakersCategory) => {
  await Promise.all([
    Clothing.findOneAndUpdate(
      { name: 'Adidas NMD' },
      {
        priceInDollarCents: 22000,
        category: sneakersCategory._id,
        image: 'https://i.ibb.co/LJJRVv0/adidas-nmd.webp',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Adidas Yeezy' },
      {
        priceInDollarCents: 28000,
        category: sneakersCategory._id,
        image: 'https://i.ibb.co/9ZKfH4K/adidas-yeezy.jpg',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Black Converse' },
      {
        priceInDollarCents: 11000,
        category: sneakersCategory._id,
        image: 'https://i.ibb.co/1nBFBhd/black-converse.webp',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Nike White AirForce' },
      {
        priceInDollarCents: 16000,
        category: sneakersCategory._id,
        image: 'https://i.ibb.co/jDDZWt3/nike-air-force.webp',
      },
      { upsert: true }
    ),
  ]);
};

const seedJackets = async (jacketsCategory) => {
  await Promise.all([
    Clothing.findOneAndUpdate(
      { name: 'Black Jean Shearling' },
      {
        priceInDollarCents: 12500,
        category: jacketsCategory._id,
        image: 'https://i.ibb.co/tQ4s3Qw/black-jean-shearling.jpg',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Blue Jean Jacket' },
      {
        priceInDollarCents: 9000,
        category: jacketsCategory._id,
        image: 'https://i.ibb.co/hHJ8SFh/blue-jean-jacket.webp',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Grey Jean Jacket' },
      {
        priceInDollarCents: 9000,
        category: jacketsCategory._id,
        image: 'https://i.ibb.co/3y0yPQt/grey-jean-jacket.jpg',
      },
      { upsert: true }
    ),
    Clothing.findOneAndUpdate(
      { name: 'Brown Shearling' },
      {
        priceInDollarCents: 16500,
        category: jacketsCategory._id,
        image: 'https://i.ibb.co/pjb7YnK/brown-shearling.jpg',
      },
      { upsert: true }
    ),
  ]);
};

export const seed = async () => {
  const {
    hatsClothingCategory,
    sneakersClothingCategory,
    jacketsClothingCategory,
  } = await seedClothingCategories();

  await Promise.all([
    seedHats(hatsClothingCategory),
    seedSneakers(sneakersClothingCategory),
    seedJackets(jacketsClothingCategory),
  ]);
};
