import { StatusCodes } from 'http-status-codes';
import * as clothingCategoryService from '../services/clothingCategoryService';

export const getAll = async (_request, response, next) => {
  try {
    const clothingCategories = await clothingCategoryService.getAll();
    response.status(StatusCodes.OK).json(clothingCategories);
  } catch (error) {
    next(error);
  }
};

export const getAllClothesByCategory = async (request, response, next) => {
  try {
    const { clothingCategoryId } = request.params;
    const clothes = await clothingCategoryService.getAllClothesByCategory(
      clothingCategoryId
    );
    response.status(StatusCodes.OK).json(clothes);
  } catch (error) {
    next(error);
  }
};
