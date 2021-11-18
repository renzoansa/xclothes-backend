import passport from 'passport';
import basicStrategy from '../strategies/basicStrategy';

passport.use(basicStrategy);

export default passport.authenticate('basic', { session: false });
