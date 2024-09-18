import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const mongoUri = process.env.MONGO_URI;

export function isDevelopmentMode() {
  return process.env.NODE_ENV !== 'production';
}

export const getPort = () => port || '4000';

export const getHost = () => host || '0.0.0.0';

export const getConnectionString = () => {
  return mongoUri;
};

export const getAccessTokenSecret = () => accessTokenSecret;

export const getStripeSecretKey = () =>
  stripeSecretKey || 'sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y';
