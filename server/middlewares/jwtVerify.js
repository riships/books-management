import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../utils/errorHandler.js';

const secret = process.env.SECRET_KEY;

const verifyJwt = (req, res, next) => {
    const token = req.header('yt-auth-token');
    // check if cookie is expired
    if (!token) {
        return next(new ErrorHandler(401, 'Access denied. No token provided.'));
    }

    try {
        const decoded = jwt.verify(token, secret);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
            res.cookies(
                'token',
                '',
                {
                    maxAge: -1,
                    httpOnly: true,
                    sameSite: 'strict',
                }
            )
            return next(new ErrorHandler(401, 'Session expired. Please log in again.'));
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return next(new ErrorHandler(401, 'Invalid or expired token.'));
    }
};

export default verifyJwt;
