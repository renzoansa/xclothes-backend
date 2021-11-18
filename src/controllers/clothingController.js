import { StatusCodes } from 'http-status-codes';
import * as clothingService from '../services/clothingService';
export const getById = async (request, response, next) => {
  try {
    const { clothingId } = request.params;
    const clothing = await clothingService.getById(clothingId);
    response.status(StatusCodes.OK).json(clothing);
  } catch (error) {
    next(error);
  }
};
