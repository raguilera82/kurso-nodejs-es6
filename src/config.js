import bodyParser from 'body-parser';
import { config } from 'dotenv';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UsersRepository from './resources/users/repository';

const settings = config();

export default app => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(passport.initialize());

    passport.use(new BasicStrategy(async (username, password, done) => {
        const user = await UsersRepository.getByUsername(username);
        if (!user) {
            return done(null, false, {message: 'User not found'});
        }
    
        const verifyPass = await user.isValidPassword(password);
        if (verifyPass) {
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password'});
        }
    }));

    const jwtOpts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: settings.parsed.JWT_SECRET_KEY
    }
    
    passport.use(new Strategy(jwtOpts, async (payload, done) => {
        
        var user = await UsersRepository.getByUsername(payload.username);
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'User not found' });
        }
        
    }) );
    
}



