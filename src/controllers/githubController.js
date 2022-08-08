import { Strategy as GithubStrategy } from 'passport-github';
import userGithub from '../models/userGithub.js';

const githubAuthentication = function (passport) {
    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/github/callback",
        // profileFields   : ['id', 'displayName', 'name', 'email'],
    }, (token, refreshToken, profile, done) => {
        console.log(profile.emails[0].value);

        // find if a user exist with this email or not
        userGithub.findOne({ email: profile.emails[0].value }).then((data) => {
            if (data) {
                return done(null, data);
            } else {
                // create a user
                userGithub({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    githubId: profile.id,
                    password: null,
                    provider: 'github',
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
        userGithub.findById(id, function (err, user) {
            done(err, user);
        });
    });

}

export default githubAuthentication;