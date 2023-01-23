import express, { Router, Request, Response } from 'express';
import authMiddleware from '../middleware/auth.js';
import fetch from 'node-fetch';
import { PlaylistResponse, TrackResponse } from '../common/types.js';

const router: Router = express.Router();

router.get('/me/playlists', authMiddleware,
  async (req: Request, res: Response) => {
    const response = await fetch(
      `${process.env.SPOTIFY_API_URL}/me/playlists?limit=50`, {
      headers: {
        'Authorization': `Bearer ${req.accessToken}`
      }
    });
    const data = <PlaylistResponse>await response.json();
    res.status(response.status).json(data.items);
  }
);

router.get('/playlists/:id/tracks', authMiddleware,
  async (req: Request, res: Response) => {
    const response = await fetch(
      // eslint-disable-next-line max-len
      `${process.env.SPOTIFY_API_URL}/playlists/${req.params.id}/tracks?fields=items(added_at%2Ctrack(album(name%2Cexternal_urls%2Cid%2Cimages)%2Cartists(external_urls%2Cname%2Cid)%2Cexplicit%2Cduration_ms%2Cexternal_urls%2Cid%2Cname))&limit=50`, {
      headers: {
        'Authorization': `Bearer ${req.accessToken}`
      }
    });
    const data = <TrackResponse>await response.json();
    res.status(response.status).json(data.items);
  }
);


router.get('/playlists/:id/', authMiddleware,
  async (req: Request, res: Response) => {
    const response = await fetch(
      // eslint-disable-next-line max-len
      `${process.env.SPOTIFY_API_URL}/playlists/${req.params.id}?fields=name`, {
      headers: {
        'Authorization': `Bearer ${req.accessToken}`
      }
    });
    const data = await response.json() as { name: string };
    res.status(response.status).json(data);
  }
);

export default router;
