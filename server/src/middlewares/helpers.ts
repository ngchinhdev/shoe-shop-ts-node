import { RequestHandler } from "express";
import mongoose from "mongoose";

export const checkValidID: RequestHandler = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID.' });
    }
    next();
};

export const checkQueryParams: RequestHandler = (req, res, next) => {
    const { page, limit } = req.query;
    const sortQuery = req.query.sort || '';

    try {
        let sortOption: any = {};
        let pageNumber: number;
        let limitNumber: any;

        if (sortQuery && typeof sortQuery === 'string') {
            if (sortQuery.startsWith('-')) {
                sortOption[sortQuery.substring(1)] = -1;
            } else {
                sortOption[sortQuery] = 1;
            }
        }

        if (page && limit) {
            pageNumber = +page;
            limitNumber = +limit;
        } else {
            pageNumber = 1;
            limitNumber = 10;
        }

        const skip: any = (pageNumber - 1) * limitNumber;

        // req.query = { ...req.query, skip, limitNumber, JSON.stringify(sortOption) };

        next();
    } catch (error) {
        throw error;
    }
};    