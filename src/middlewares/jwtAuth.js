import passport from 'passport';
import jwtStrategy from '../strategies/jwtStrategy';

passport.use(jwtStrategy);

export default passport.authenticate('bearer', { session: false });
