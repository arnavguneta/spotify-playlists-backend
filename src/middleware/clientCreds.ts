import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import { Credentials } from '../common/types.js';

const getClientCreds = async () => {
    const id = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    const api = 'https://accounts.spotify.com/api/token';
    const authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' +
                `${Buffer.from(`${id}:${secret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    };

    const response = await fetch(api, authOptions);
    if (response.ok) {
        const data = <Credentials>await response.json();
        return data.access_token;
    } else {
        throw Error('Unable to get client credentials');
    }
};

// if no user token, use client token (for endpoints like public playlists)
const clientAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.accessToken;
    try {
        if (!token) token = await getClientCreds();
        else {
            const decodedSecret = <string>jwt.verify(
                token, <string>process.env.JWT_SECRET
            );
            token = decodedSecret;
        }
        req.accessToken = token;
        next();
    } catch (error) {
        res.status(403).send({ error: 'Unauthorized' });
    }
};

export default clientAuth;