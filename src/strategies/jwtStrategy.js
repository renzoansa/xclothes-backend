import { Strategy as BearerStrategy } from 'passport-http-bearer';
import * as userService from '../services/userService';

export default new BearerStrategy(async (accessToken, done) => {
  try {
    const user = await userService.authenticateUserWithAccessToken(accessToken);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
