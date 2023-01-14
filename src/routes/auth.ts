import express, { Router, Request, Response, CookieOptions } from 'express';
import passport from 'passport';
import passportSpotify from 'passport-spotify';
import jwt from 'jsonwebtoken';

const PROJECT_URL = ((process.env.NODE_ENV === 'prod')
    ? process.env.PROD_PROJECT_URL
    : process.env.DEV_PROJECT_URL) || '';

    interface AuthenticationInfo {
    accessToken: string,
    refreshToken: string,
    expires_in: number,
    profile: object
}

const router: Router = express.Router();
const SpotifyStrategy = passportSpotify.Strategy;

passport.serializeUser((user, done) => {
    done(undefined, user);
});

passport.deserializeUser((user, done) => {
    done(undefined, <object>user);
});

passport.use(
    new SpotifyStrategy({
        clientID: <string>process.env.SPOTIFY_CLIENT_ID,
        clientSecret: <string>process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: `${PROJECT_URL}${process.env.API_ENDPOINT}/auth/callback`
    }, (accessToken, refreshToken, expires_in, profile, done) => {
        return done(undefined,
            { accessToken, refreshToken, expires_in, profile });
    })
);

router.get('/login',
    passport.authenticate('spotify', <object>{
        scope: [
            'user-read-email',
            'playlist-read-private',
            'playlist-read-collaborative'
        ],
        showDialog: true
    })
);

router.get('/callback',
    passport.authenticate('spotify',
        { failureRedirect: 'https://arnav.guneta.com/projects/spotify-app' }),
    (req: Request, res: Response) => {
        const authInfo = <AuthenticationInfo>req.user;
        const token = jwt.sign(
            authInfo.accessToken,
            <string>process.env.JWT_SECRET
        );
        return res
            .cookie('accessToken', token, <CookieOptions>{
                httpOnly: true,
                expire: new Date(Date.now() + authInfo.expires_in * 1000),
                secure: true,
                sameSite: 'none'
            }).redirect('https://arnav.guneta.com/projects/spotify-app');
    }
);

router.get('/logout', (req: Request, res: Response) => {
    return res
        .clearCookie('accessToken')
        .status(200)
        .json({ message: 'Successfully logged out' });
});

export default router;
export { passport };

// http://localhost:3000
// https://arnav.guneta.com/projects/spotify-app
