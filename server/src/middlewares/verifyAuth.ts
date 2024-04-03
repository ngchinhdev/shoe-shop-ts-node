import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface IUserVerified {
    id: string;
    isAdmin: boolean;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUserVerified;
        }
    }
}

export const verifyToken: RequestHandler<unknown, unknown, IUserVerified, unknown> = (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied.' });
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

        req.user = verifiedUser as IUserVerified;

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

export const verifyAdmin: RequestHandler = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user?.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: 'You need admin rights.' });
        }
    });
};
