import express, { Router, Request, Response, CookieOptions } from 'express';
import passport from 'passport';
import passportSpotify from 'passport-spotify';
import jwt from 'jsonwebtoken';

interface AuthenticationInfo {
    accessToken: string,
    refreshToken: string,
    expires_in: number,
    profile: object
}

const router: Router = express.Router();
const SpotifyStrategy = passportSpotify.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((user, done) => {
    done(undefined, <object>user);
});

passport.use(
    new SpotifyStrategy({
        clientID: <string>process.env.SPOTIFY_CLIENT_ID,
        clientSecret: <string>process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}/auth/spotify/callback`
    }, (accessToken, refreshToken, expires_in, profile, done) => {
        return done(undefined,
            { accessToken, refreshToken, expires_in, profile });
    })
);

router.get('/spotify',
    passport.authenticate('spotify', <object>{
        scope: [
            'user-read-email',
            'playlist-read-private',
            'playlist-read-collaborative'
        ],
        showDialog: true
    })
);

router.get('/spotify/callback',
    passport.authenticate('spotify',
        { failureRedirect: `${process.env.API_URL}/home` }),
    (req: Request, res: Response) => {
        const authInfo = <AuthenticationInfo>req.user;
        console.log(req.user);
        const token = jwt.sign(
            authInfo.accessToken,
            <string>process.env.JWT_SECRET
        );
        return res
            .cookie('accessToken', token, <CookieOptions>{
                httpOnly: true,
                expire: new Date(Date.now() + authInfo.expires_in * 1000)
            }).redirect('/protected');
    }
);

export default router;
export { passport };