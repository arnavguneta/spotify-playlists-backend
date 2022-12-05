import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import passportSpotify from 'passport-spotify';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const SpotifyStrategy = passportSpotify.Strategy;
passport.serializeUser((req, user, done) => {
    done(undefined, user);
});
passport.deserializeUser((user, done) => {
    done(undefined, user);
});
passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}/auth/spotify/callback`
}, (accessToken, refreshToken, expires_in, profile, done) => {
    console.log({ accessToken, refreshToken, expires_in, profile });
    return done(undefined, { accessToken, refreshToken, expires_in, profile });
}));
const app = express();
app.use(session({
    secret: process.env.SPOTIFY_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(passport.initialize());
app.get('/', (req, res) => {
    res.send('hi');
});
app.get(`${process.env.API_URL}/auth/spotify`, passport.authenticate('spotify', {
    scope: [
        'user-read-email',
        'playlist-read-private',
        'playlist-read-collaborative'
    ],
    showDialog: true
}));
app.get(`${process.env.API_URL}/auth/spotify/callback`, passport.authenticate('spotify', { failureRedirect: `${process.env.API_URL}/auth/spotify` }), (req, res) => {
    res.redirect('/');
});
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
//# sourceMappingURL=index.js.map