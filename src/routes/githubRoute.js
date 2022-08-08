import express from 'express';
const router = express.Router();
import passport from 'passport';
import githubAuthentication from '../controllers/githubController.js';
githubAuthentication(passport);


router.get('/github', passport.authenticate('github', { scope: ['email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: process.env.AUTH_GITHUB_FAILURE_REDIRECT }), (req, res) => {
    res.redirect(process.env.AUTH_GITHUB_SUCCESS_REDIRECT);
});

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    res.redirect(process.env.LOGOUT_REDIRECT)
    });
  });

export default router;