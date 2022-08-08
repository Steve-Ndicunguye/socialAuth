import express from 'express';
const router = express.Router();
import passport from 'passport';
import googleAuthentication from '../controllers/googleController.js';
googleAuthentication(passport);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: process.env.AUTH_FAILURE_REDIRECT }), (req, res) => {
    res.redirect(process.env.AUTH_SUCCESS_REDIRECT);
});

export default router;