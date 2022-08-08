import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import user from '../models/user.js';

const googleAuthentication = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile.emails[0].value);

        // find if a user exist with this email or not
        user.findOne({ email: profile.emails[0].value }).then((data) => {
            if (data) {
                return done(null, data);
            } else {
                // create a user
                user({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    password: null,
                    provider: 'google',
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
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });

}

export default googleAuthentication;