import express from 'express';
import authRouter, { passport } from './routes/auth.js';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authMiddleware from './middleware/auth.js';
const PORT = process.env.PORT || 3000;
const app = express();
app.use(session({
    secret: process.env.SPOTIFY_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(`${process.env.API_URL}/auth`, authRouter);
app.get('/home', (req, res) => {
    res.send('hi');
});
app.get('/protected', authMiddleware, (req, res) => {
    res.send('hi');
});
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
//# sourceMappingURL=index.js.map