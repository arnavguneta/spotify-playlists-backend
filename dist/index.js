import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter, { passport } from './routes/auth.js';
import userRouter from './routes/user.js';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(session({
    secret: process.env.SPOTIFY_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(`${process.env.API_ENDPOINT}/auth`, authRouter);
app.use(`${process.env.API_ENDPOINT}/user`, userRouter);
app.get('/home', (req, res) => {
    res.send('hi');
});
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
//# sourceMappingURL=index.js.map