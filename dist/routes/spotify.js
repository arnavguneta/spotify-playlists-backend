import express from 'express';
import fetch from 'node-fetch';
import clientAuth from '../middleware/clientCreds.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();
const TRACK_LIMIT = 3000;
const PLAYLIST_LIMIT = 1000;
router.get('/me/playlists', authMiddleware, async (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    if (offset >= PLAYLIST_LIMIT)
        return res.status(200).json({ items: [], offset });
    const response = await fetch(`${process.env.SPOTIFY_API_URL}/me/playlists?limit=50&offset=${offset}`, {
        headers: {
            'Authorization': `Bearer ${req.accessToken}`
        }
    });
    const data = await response.json();
    if (response.ok)
        return res.status(response.status)
            .json({ ...data, offset: offset + data.items.length });
    else
        return res.status(response.status).json();
});
router.get('/playlists/:id/tracks', clientAuth, async (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    if (offset >= TRACK_LIMIT)
        return res.status(200).json({ items: [], offset });
    const response = await fetch(
    // eslint-disable-next-line max-len
    `${process.env.SPOTIFY_API_URL}/playlists/${req.params.id}/tracks?fields=items(added_at%2Ctrack(album(name%2Cexternal_urls%2Cid%2Cimages)%2Cartists(external_urls%2Cname%2Cid)%2Cexplicit%2Cduration_ms%2Cexternal_urls%2Cid%2Cname))&limit=50&offset=${offset}`, {
        headers: {
            'Authorization': `Bearer ${req.accessToken}`
        }
    });
    const data = await response.json();
    if (response.ok)
        return res.status(response.status)
            .json({ items: data.items, offset: offset + data.items.length });
    else
        return res.status(response.status).json();
});
router.get('/playlists/:id/', clientAuth, async (req, res) => {
    const response = await fetch(
    // eslint-disable-next-line max-len
    `${process.env.SPOTIFY_API_URL}/playlists/${req.params.id}?fields=name`, {
        headers: {
            'Authorization': `Bearer ${req.accessToken}`
        }
    });
    const data = await response.json();
    res.status(response.status).json(data);
});
export default router;
//# sourceMappingURL=spotify.js.map