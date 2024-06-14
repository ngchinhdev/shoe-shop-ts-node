import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import { type IUser } from "../types/users";
import UserModel from "../models/User";
import { generateCodeForEmail } from "../utils/helpers";

const generateAccessToken = (id: string, isAdmin: boolean) => {
    return jwt.sign(
        {
            id: id, isAdmin: isAdmin
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" });
};

const generateRefreshToken = (id: string, isAdmin: boolean) => {
    return jwt.sign(
        {
            id: id, isAdmin: isAdmin
        },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" });
};

export const registerUser: RequestHandler<unknown, unknown, IUser, unknown> = async (req, res, next) => {
    const { fullName, email, phone, password, address } = req.body;

    console.log(req.body);

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existUserEmail = await UserModel.findOne({ email: email });

        if (existUserEmail) {
            return res.status(409).json({ error: "Email is already in use." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            address,
        });

        // const { user, ...order } = newUser;

        return res.status(201).json({ data: newUser });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const loginUser: RequestHandler<unknown, unknown, IUser, unknown> = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password." });
        }

        const accessToken = jwt.sign(
            {
                id: user._id, isAdmin: user.isAdmin
            },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "30m" }
        );

        const refreshToken = jwt.sign(
            {
                id: user._id, isAdmin: user.isAdmin
            },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: "7d" }
        );

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
    } catch (error) {
        next(error);
    }
};

interface IJwtPayload {
    id: string;
    isAdmin: boolean;
}

export const newAccessToken: RequestHandler<unknown, unknown, { refreshToken: string; }, unknown> = async (req, res, next) => {
    const refreshToken = req.cookies['jwt-refresh-token'];

    if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required." });
    }

    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as IJwtPayload;

        const accessToken = generateAccessToken(user.id, user.isAdmin);

        return res.status(200).json({ accessToken });
    } catch (error) {
        next(error);
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chinhnguyennn24@gmail.com',
        pass: 'eulk tkzr mfio durj'
    }
});

let receiveEmail = '';

let codeEmail = '';

export const sendEmail: RequestHandler<unknown, unknown, { email: string; }, unknown> = async (req, res, next) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required." });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ error: "Email not found." });
        }

        receiveEmail = email;
        const codeEmailRandom = generateCodeForEmail();

        transporter.sendMail({
            from: 'chinhnguyennn24@gmail.com',
            to: email,
            subject: 'Please use the code to verify your email.',
            text: 'The code for verification is: ' + codeEmailRandom
        }, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                codeEmail = codeEmailRandom;

                return res.status(200).json({ message: 'Email sent.', statusCode: 200 });
            }
        });
    }
    catch (error) {
        next(error);
    };
};

export const confirmEmailCode: RequestHandler<unknown, unknown, { code: string; }, unknown> = async (req, res, next) => {
    const { code } = req.body;

    try {
        if (!code) {
            return res.status(400).json({ error: "Code is required." });
        }

        if (code !== codeEmail) {
            return res.status(401).json({ error: "Invalid code." });
        }

        const user = await UserModel.findOne({ email: receiveEmail });

        return res.status(200).json({ id: user?.id, message: 'Email confirmed.', statusCode: 200 });
    } catch (error) {
        next(error);
    }
};

export const updatePassword: RequestHandler<unknown, unknown, { id: string; password: string; }, unknown> = async (req, res, next) => {
    const { id, password } = req.body;

    try {
        if (!id || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await UserModel.findByIdAndUpdate(id, { password: hashedPassword });

        return res.status(200).json({ message: 'Password updated.', statusCode: 200 });
    } catch (error) {
        next(error);
    }
};