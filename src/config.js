import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export function isDevelopmentMode() {
  return process.env.NODE_ENV !== 'production';
}

export const getPort = () => port || '3000';

export const getHost = () => host || '0.0.0.0';

export const getConnectionString = () => {
  return `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
};

export const getAccessTokenSecret = () => accessTokenSecret;

export const getStripeSecretKey = () =>
  stripeSecretKey || 'sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y';
