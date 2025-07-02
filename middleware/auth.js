import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'authorization token missing' })
        }
        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}