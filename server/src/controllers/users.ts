import { RequestHandler } from "express";

import UserModel from "../models/User";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find({ isDelete: false }).exec();

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

export const updateUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, 'Invalid user ID.');
        }

        const user = await UserModel.findByIdAndUpdate(userId, req.body).exec();

        if (!user) {
            throw createHttpError(404, 'User not found.');
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


export const deleteUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, 'Invalid user ID.');
        }

        const user = await UserModel.findByIdAndUpdate(userId, { isDelete: true }).exec();

        if (!user) {
            throw createHttpError(404, 'User not found.');
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};