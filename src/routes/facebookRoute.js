import express from 'express';
const router = express.Router();
import passport from 'passport';
import facebookAuthentication from '../controllers/facebookController.js';
facebookAuthentication(passport);


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: process.env.AUTH_FACEBOOK_FAILURE_REDIRECT }), (req, res) => {
    res.redirect(process.env.AUTH_FACEBOOK_SUCCESS_REDIRECT);
});

export default router;