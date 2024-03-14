import { RequestHandler } from "express";

import UserModel from "../models/User";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find().exec();

        if (users.length === 0) {
            throw createHttpError(404, 'No users found.');
        }

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, 'Invalid user ID.');
        }

        const user = await UserModel.findById(userId).exec();

        if (!user) {
            throw createHttpError(404, 'User not found.');
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const createUser: RequestHandler = async (req, res, next) => {
    const { fullName, email, password, address, avatar, isAdmin } = req.body;

    try {
        if (!fullName || !email || !password) {
            throw createHttpError(400, 'Missing required fields.');
        }

        const user = await UserModel.create({ fullName, email, password, address, avatar, isAdmin });

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};