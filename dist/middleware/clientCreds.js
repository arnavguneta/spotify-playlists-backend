import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
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
        const data = await response.json();
        return data.access_token;
    }
    else {
        throw Error('Unable to get client credentials');
    }
};
// if no user token, use client token (for endpoints like public playlists)
const clientAuth = async (req, res, next) => {
    let token = req.cookies.accessToken;
    try {
        if (!token)
            token = await getClientCreds();
        else {
            const decodedSecret = jwt.verify(token, process.env.JWT_SECRET);
            token = decodedSecret;
        }
        req.accessToken = token;
        next();
    }
    catch (error) {
        res.status(403).send({ error: 'Unauthorized' });
    }
};
export default clientAuth;
//# sourceMappingURL=clientCreds.js.map