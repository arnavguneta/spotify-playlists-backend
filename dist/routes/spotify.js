import express from 'express';
import fetch from 'node-fetch';
import clientAuth from '../middleware/clientCreds.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();
router.get('/me/playlists', authMiddleware, async (req, res) => {
    const response = await fetch(`${process.env.SPOTIFY_API_URL}/me/playlists?limit=50`, {
        headers: {
            'Authorization': `Bearer ${req.accessToken}`
        }
    });
    const data = await response.json();
    res.status(response.status).json(data.items);
});
router.get('/playlists/:id/tracks', clientAuth, async (req, res) => {
    console.log(req.query.offset);
    const offset = parseInt(req.query.offset) || 0;
    const response = await fetch(
    // eslint-disable-next-line max-len
    `${process.env.SPOTIFY_API_URL}/playlists/${req.params.id}/tracks?fields=items(added_at%2Ctrack(album(name%2Cexternal_urls%2Cid%2Cimages)%2Cartists(external_urls%2Cname%2Cid)%2Cexplicit%2Cduration_ms%2Cexternal_urls%2Cid%2Cname))&limit=50&offset=${offset}`, {
        headers: {
            'Authorization': `Bearer ${req.accessToken}`
        }
    });
    const data = await response.json();
    console.log(offset, response.status);
    res.status(response.status)
        .json({ items: data.items, offset: offset + data.items.length });
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