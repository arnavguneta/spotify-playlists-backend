import express from 'express';
import passport from 'passport';
import passportSpotify from 'passport-spotify';
import jwt from 'jsonwebtoken';
const router = express.Router();
const SpotifyStrategy = passportSpotify.Strategy;
passport.serializeUser((user, done) => {
    done(undefined, user);
});
passport.deserializeUser((user, done) => {
    done(undefined, user);
});
passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `${process.env.API_ENDPOINT}/auth/callback`
}, (accessToken, refreshToken, expires_in, profile, done) => {
    return done(undefined, { accessToken, refreshToken, expires_in, profile });
}));
router.get('/login', passport.authenticate('spotify', {
    scope: [
        'user-read-email',
        'playlist-read-private',
        'playlist-read-collaborative'
    ],
    showDialog: true
}));
router.get('/callback', passport.authenticate('spotify', { failureRedirect: 'http://localhost:3000/' }), (req, res) => {
    const authInfo = req.user;
    const token = jwt.sign(authInfo.accessToken, process.env.JWT_SECRET);
    return res
        .cookie('accessToken', token, {
        httpOnly: true,
        expire: new Date(Date.now() + authInfo.expires_in * 1000),
        secure: true,
        sameSite: 'none'
    }).redirect('http://localhost:3000/');
});
router.get('/logout', (req, res) => {
    return res
        .clearCookie('accessToken')
        .status(200)
        .json({ message: 'Successfully logged out' });
});
export default router;
export { passport };
//# sourceMappingURL=auth.js.map