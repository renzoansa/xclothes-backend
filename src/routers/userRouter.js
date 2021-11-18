import { Router } from 'express';
import * as userController from '../controllers/userController';
import basicAuth from '../middlewares/basicAuth';
import jwtAuth from '../middlewares/jwtAuth';
import validate from '../middlewares/validate';
import createUserValidator from '../validators/createUserValidator';

const userRouter = Router();

userRouter.post('/', validate(createUserValidator), userController.createUser);
userRouter.post('/access-token', basicAuth, userController.getAccessToken);
userRouter.post('/refresh-access-token', userController.refreshAccessToken);
userRouter.post(
  '/revoke-refresh-token',
  jwtAuth,
  userController.revokeRefreshToken
);

export default userRouter;
