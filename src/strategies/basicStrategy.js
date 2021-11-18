import { BasicStrategy } from 'passport-http';
import * as userService from '../services/userService';

export default new BasicStrategy(async (email, password, done) => {
  try {
    const user = await userService.authenticateUser(email, password);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
