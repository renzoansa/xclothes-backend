import { Router } from 'express';
import * as clothingCategoryController from '../controllers/clothingCategoryController';

const clothingCategoryRouter = Router();

clothingCategoryRouter.get('/', clothingCategoryController.getAll);
clothingCategoryRouter.get(
  '/:clothingCategoryId/clothes',
  clothingCategoryController.getAllClothesByCategory
);
export default clothingCategoryRouter;
