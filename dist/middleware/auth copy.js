import jwt from 'jsonwebtoken';
const getClientCreds = () => {
    const id = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' +
                `${Buffer.from(`${id}:${secret}`).toString('base64')}`
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const token = body.access_token;
        }
    });
};
const auth = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(403).json({ error: 'Unauthorized' });
    try {
        const decodedSecret = jwt.verify(token, process.env.JWT_SECRET);
        req.accessToken = decodedSecret;
        next();
    }
    catch (error) {
        res.status(403).send({ error: 'Unauthorized' });
    }
};
export default auth;
//# sourceMappingURL=auth%20copy.js.map