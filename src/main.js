import express from 'express';
import morgan from 'morgan';
import * as config from './config';
import userRouter from './routers/userRouter';
import clothingCategoryRouter from './routers/clothingCategoryRouter.js';
import * as errorHandler from './middlewares/errorHandler';
import * as notFoundHandler from './middlewares/notFoundHandler';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import * as seeder from './seeder';
import clothingRouter from './routers/clothingRouter';
import * as paymentController from './controllers/paymentController';
import validate from './middlewares/validate';
import createPaymentIntentValidator from './validators/createPaymentIntentValidator';

const main = async () => {
  try {
    await mongoose.connect(config.getConnectionString());
    console.log(`Database connected`);
  } catch (error) {
    console.error(error);
  }

  await seeder.seed();

  const server = express();

  server.use(
    cors({
      origin: true,
      methods: 'POST, GET',
      credentials: true,
    })
  );
  server.use(morgan('dev'));
  server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(passport.initialize());
  server.use('/users', userRouter);
  server.use('/clothing-categories', clothingCategoryRouter);
  server.use('/clothes', clothingRouter);
  server.post(
    '/create-payment-intent',
    validate(createPaymentIntentValidator),
    paymentController.createPaymentIntent
  );
  server.use(errorHandler.logErrors);
  server.use(errorHandler.wrapGenericErrors);
  server.use(errorHandler.handle);
  server.use(notFoundHandler.handle);
  server.listen(config.getPort(), config.getHost(), () => {
    console.log(
      `Server listen on http://${config.getHost()}:${config.getPort()}`
    );
  });
};

main();
