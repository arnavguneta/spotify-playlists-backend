import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter, { passport } from './routes/auth.js';
import userRouter from './routes/user.js';


const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(
    session({
        secret: <string>process.env.SPOTIFY_SECRET,
        resave: true,
        saveUninitialized: true
    })
);

app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

app.use(`${process.env.API_ENDPOINT}/auth`, authRouter);
app.use(`${process.env.API_ENDPOINT}/user`, userRouter);

app.get('/home', (req: Request, res: Response) => {
    res.send('hi');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
