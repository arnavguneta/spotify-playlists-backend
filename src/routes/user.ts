import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/auth.js';
import fetch from 'node-fetch';

const router: Router = express.Router();

router.get('/', authMiddleware,
    async (req: Request, res: Response) => {
        const profileResponse = await fetch(
            `${process.env.SPOTIFY_API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${req.accessToken}`
            }
        });
        const profileData = await profileResponse.json();
        res.status(profileResponse.status).json(profileData);
    }
);

router.get('/playlists', authMiddleware,
    async (req: Request, res: Response) => {
        const profileResponse = await fetch(
            `${process.env.SPOTIFY_API_URL}/me/playlists`, {
            headers: {
                'Authorization': `Bearer ${req.accessToken}`
            }
        });
        const profileData = await profileResponse.json();
        res.status(profileResponse.status).json(profileData);
    }
);

export default router;
