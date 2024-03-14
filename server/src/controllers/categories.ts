import { RequestHandler } from "express";

import CategoryModel from "../models/Category";
import { ICategory } from "../types/categories";

export const getCategories: RequestHandler = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find().exec();

        if (categories.length === 0) {
            res.status(200).json({ message: 'No categories found.' });
        }

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

export const createCategory: RequestHandler<unknown, unknown, ICategory, unknown> = async (req, res, next) => {
    const { name, image } = req.body;

    try {
        if (!name || !image) {
            res.status(400).json({ message: 'Missing required fields.' });
        }

        const category = await CategoryModel.create({ name, image });

        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};