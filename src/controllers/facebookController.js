import { Strategy as FacebookStrategy } from 'passport-facebook';
import userFacebook from '../models/userFacebook.js';

const facebookAuthentication = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/facebook/callback",
        profileFields   : ['id', 'displayName', 'name', 'email'],
    }, (token, refreshToken, profile, done) => {
        console.log(profile.emails[0].value);

        // find if a user exist with this email or not
        userFacebook.findOne({ email: profile.emails[0].value }).then((data) => {
            if (data) {
                return done(null, data);
            } else {
                // create a user
                userFacebook({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    facebookId: profile.id,
                    password: null,
                    provider: 'facebook',
                    isVerified: true,
                }).save(function (err, data) {
                    return done(null, data);
                });
            }
        });
    }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userFacebook.findById(id, function (err, user) {
            done(err, user);
        });
    });

}

export default facebookAuthentication;