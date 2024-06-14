"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied.' });
    }
    try {
        const verifiedUser = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verifiedUser;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError && error.message === 'jwt expired') {
            return res.status(401).json({ message: 'Token expired.', code: 401 });
        }
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
exports.verifyToken = verifyToken;
const verifyAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        var _a;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
            next();
        }
        else {
            return res.status(403).json({ message: 'You need admin rights.' });
        }
    });
};
exports.verifyAdmin = verifyAdmin;
