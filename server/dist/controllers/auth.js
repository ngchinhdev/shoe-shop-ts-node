"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.confirmEmailCode = exports.sendEmail = exports.newAccessToken = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../models/User"));
const helpers_1 = require("../utils/helpers");
const generateAccessToken = (id, isAdmin) => {
    return jsonwebtoken_1.default.sign({
        id: id, isAdmin: isAdmin
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const generateRefreshToken = (id, isAdmin) => {
    return jsonwebtoken_1.default.sign({
        id: id, isAdmin: isAdmin
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, phone, password, address } = req.body;
    console.log(req.body);
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const existUserEmail = yield User_1.default.findOne({ email: email });
        if (existUserEmail) {
            return res.status(409).json({ error: "Email is already in use." });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield User_1.default.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            address,
        });
        // const { user, ...order } = newUser;
        return res.status(201).json({ data: newUser });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password." });
        }
        const accessToken = jsonwebtoken_1.default.sign({
            id: user._id, isAdmin: user.isAdmin
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
        const refreshToken = jsonwebtoken_1.default.sign({
            id: user._id, isAdmin: user.isAdmin
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        res.cookie('jwt-refresh-token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 604800000
        });
        return res.status(200).json({
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                isAdmin: user.isAdmin
            },
            accessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const newAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies['jwt-refresh-token'];
    if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required." });
    }
    try {
        const user = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken(user.id, user.isAdmin);
        return res.status(200).json({ accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.newAccessToken = newAccessToken;
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'chinhnguyennn24@gmail.com',
        pass: 'eulk tkzr mfio durj'
    }
});
let receiveEmail = '';
let codeEmail = '';
const sendEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required." });
        }
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: "Email not found." });
        }
        receiveEmail = email;
        const codeEmailRandom = (0, helpers_1.generateCodeForEmail)();
        transporter.sendMail({
            from: 'chinhnguyennn24@gmail.com',
            to: email,
            subject: 'Please use the code to verify your email.',
            text: 'The code for verification is: ' + codeEmailRandom
        }, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                codeEmail = codeEmailRandom;
                return res.status(200).json({ message: 'Email sent.', statusCode: 200 });
            }
        });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.sendEmail = sendEmail;
const confirmEmailCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    try {
        if (!code) {
            return res.status(400).json({ error: "Code is required." });
        }
        if (code !== codeEmail) {
            return res.status(401).json({ error: "Invalid code." });
        }
        const user = yield User_1.default.findOne({ email: receiveEmail });
        return res.status(200).json({ id: user === null || user === void 0 ? void 0 : user.id, message: 'Email confirmed.', statusCode: 200 });
    }
    catch (error) {
        next(error);
    }
});
exports.confirmEmailCode = confirmEmailCode;
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = req.body;
    try {
        if (!id || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        yield User_1.default.findByIdAndUpdate(id, { password: hashedPassword });
        return res.status(200).json({ message: 'Password updated.', statusCode: 200 });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePassword = updatePassword;
