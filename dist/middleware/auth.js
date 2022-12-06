import jwt from 'jsonwebtoken';
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
//# sourceMappingURL=auth.js.map