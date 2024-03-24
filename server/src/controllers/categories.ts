import { RequestHandler } from "express";

import CategoryModel from "../models/Category";
import { ICategory } from "../types/categories";
import { IProductParams } from "../types/products";

export const getCategories: RequestHandler = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find({ isDeleted: false }).exec();

        if (categories.length === 0) {
            res.status(200).json({ message: 'No categories found.' });
        }

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

export const getCategory: RequestHandler = async (req, res, next) => {
    const categoryId = req.params.id;

    try {
        if (!categoryId) {
            res.status(400).json({ message: 'Invalid category ID.' });
        }

        const category = await CategoryModel.findById(categoryId).exec();

        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
        }

        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

export const createCategory: RequestHandler<unknown, unknown, ICategory, unknown> = async (req, res, next) => {
    const { name } = req.body;
    const imageMulter = req.file as Express.Multer.File;

    try {
        if (!name || !imageMulter) {
            res.status(400).json({ message: 'Missing required fields.' });
        }

        const image = `${req.protocol}://${req.hostname}:${process.env.PORT}/images/categories/${imageMulter.originalname}`;

        const category = await CategoryModel.create({ name, image });

        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

export const updateCategory: RequestHandler<IProductParams, unknown, ICategory, unknown> = async (req, res, next) => {
    const categoryId = req.params.id;
    const { name, oldImage } = req.body;
    const imageMulter = req.file as Express.Multer.File;

    try {
        if (!categoryId) {
            res.status(400).json({ message: 'Invalid category ID.' });
        }

        const category = await CategoryModel.findById(categoryId).exec();

        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
        }

        let image: string;
        if (!imageMulter && oldImage) {
            image = oldImage;
        } else {
            image = `${req.protocol}://${req.hostname}:${process.env.PORT}/images/categories/${imageMulter.originalname}`;
        }

        await CategoryModel.updateOne({ _id: categoryId }, { name, image }).exec();

        res.status(204).json({ message: 'Category updated successfully.' });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
    const categoryId = req.params.id;

    try {
        if (!categoryId) {
            res.status(400).json({ message: 'Invalid category ID.' });
        }

        const category = await CategoryModel.findById(categoryId).exec();

        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
        }

        await CategoryModel.updateOne({ _id: categoryId }, { isDeleted: true }).exec();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};