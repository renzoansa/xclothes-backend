import { Router } from 'express';
import * as clothingController from '../controllers/clothingController';

const clothingRouter = Router();

clothingRouter.get('/:clothingId', clothingController.getById);

export default clothingRouter;
