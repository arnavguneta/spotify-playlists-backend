import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(403).json({ error: 'Unauthorized' });
    try {
        const decodedSecret = <string>jwt.verify(
            token, <string>process.env.JWT_SECRET
        );
        req.accessToken = decodedSecret;
        next();
    } catch (error) {
        res.status(403).send({ error: 'Unauthorized' });
    }
};

export default auth;