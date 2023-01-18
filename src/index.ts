import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter, { passport } from './routes/auth.js';
import userRouter from './routes/user.js';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;
const app: Application = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(
    session({
        secret: <string>process.env.SPOTIFY_SECRET,
        resave: true,
        saveUninitialized: true
    })
);

app.use(cors({
    origin: ['http://localhost:3000', 'https://arnav.guneta.com'],
    credentials: true,
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '../public')));

// REST API
app.use(`${process.env.API_ENDPOINT}/auth`, authRouter);
app.use(`${process.env.API_ENDPOINT}/user`, userRouter);

// React
app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'), err => {
        if (err) res.status(500).send(err);
      });
    // res.writeHead(302, {
    //     'Location': '/projects/spotify-app/'
    // });
    // res.end();
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
