import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

import { type IProductParams, type IProduct } from "../types/products";

import ProductModel from "../models/Product";
import CategoryModel from "../models/Category";
import exp from "constants";

export const getProducts: RequestHandler = async (req, res, next) => {
    const { page, limit } = req.query;
    const sortQuery = req.query.sort || '';

    try {
        let sortOption: any = {};
        let pageNumber: number;
        let limitNumber: number;

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
        } else if (!page && limit) {
            pageNumber = 1;
            limitNumber = +limit;
        } else if (page && !limit) {
            pageNumber = +page;
            limitNumber = 10;
        } else {
            pageNumber = 1;
            limitNumber = 10;
        }

        const skip = (pageNumber - 1) * limitNumber;

        const products = await ProductModel.find({ isDeleted: false }).skip(skip).limit(limitNumber).sort(sortOption).exec();
        if (products.length === 0) {
            throw createHttpError(404, 'No products found.');
        }

        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById: RequestHandler = async (req, res, next) => {
    const productId = req.params.id;

    try {
        const product = await ProductModel.findById(productId, { isDeleted: false }).exec();

        if (!product) {
            throw createHttpError(404, 'Product not found.');
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProductBySearchName: RequestHandler = async (req, res, next) => {
    const name = req.params.name;

    try {
        const products = await ProductModel.find({ name: { $regex: `.*${name}*.`, $options: 'i' }, isDeleted: false }).exec();

        if (products.length === 0) {
            throw createHttpError(404, 'No products found.');
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductsByCategoryId: RequestHandler = async (req, res, next) => {
    const categoryId = req.params.id;

    try {
        const products = await ProductModel.find({ categoryId, isDeleted: false }).exec();

        if (products.length === 0) {
            throw createHttpError(404, 'No products found.');
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductsByCategoryName: RequestHandler = async (req, res, next) => {
    const categoryName = req.params.name;

    try {
        const category = await CategoryModel.findOne({ name: { $regex: categoryName, $options: 'i' } }).exec();

        if (!category) {
            throw createHttpError(404, 'Category not found.');
        }

        const products = await ProductModel.find({ categoryId: category._id, isDeleted: false }).exec();

        if (products.length === 0) {
            throw createHttpError(404, 'No products found.');
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getHotProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await ProductModel.find({ hot: true, isDeleted: false }).exec();

        if (products.length === 0) {
            throw createHttpError(404, 'No hot products found.');
        }

        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductsPriceRange: RequestHandler = async (req, res, next) => {
    const min = req.params.min;
    const max = req.params.max;
    console.log(min, max);

    try {
        const products = await ProductModel.find({
            price: { $gte: min, $lte: max },
            isDeleted: false
        });

        if (products.length === 0) {
            throw createHttpError(404, 'No products found.');
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductsDiscountRange: RequestHandler = async (req, res, next) => {
    const minDiscount = req.params.min; // 5
    const maxDiscount = req.params.max; // 10

    try {
        const products = await ProductModel.find({
            $expr: {
                $gte: [
                    { $divide: [{ $subtract: ["$orgPrice", "$price"] }, "$orgPrice"] },
                    +minDiscount / 100
                ],
                $lte: [
                    { $divide: [{ $subtract: ["$orgPrice", "$price"] }, "$orgPrice"] },
                    +maxDiscount / 100
                ]
            },
            isDeleted: false
        });

        if (products.length === 0) {
            throw createHttpError(404, 'No products found.');
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const createProduct: RequestHandler<unknown, unknown, IProduct, unknown> = async (req, res, next) => {
    const { name, description, price, orgPrice, hot, color, types, categoryId } = req.body;
    let imagesMulter = req.files as Express.Multer.File[];

    try {
        if (!name || !description || !price || !orgPrice || !imagesMulter || !color || !types || !categoryId) {
            throw createHttpError(400, 'Missing required fields.');
        }

        const typesFormatted = types?.split(',').map(type => {
            const [size, quantity] = type.split('/');
            return { size: +size, quantity: +quantity };
        });

        const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;

        const images = imagesMulter.map(img => `${baseUrl}/images/products/${img.originalname}`);

        const product = await ProductModel.create({ name, description, price, orgPrice, images, hot, color, types: typesFormatted, categoryId });

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const updateProduct: RequestHandler<IProductParams, unknown, IProduct, unknown> = async (req, res, next) => {
    const productId = req.params.id;

    const { name, description, price, orgPrice, hot, color, types, categoryId, oldImages } = req.body;
    let imagesMulter = req.files as Express.Multer.File[];

    try {
        if (!mongoose.isValidObjectId(productId)) {
            throw createHttpError(400, 'Invalid product ID.');
        }

        const product = await ProductModel.findById(productId).exec();

        if (!product) {
            throw createHttpError(404, 'Product not found.');
        }

        const typesFormatted = types?.split(',').map(type => {
            const [size, quantity] = type.split('/');
            return { size: +size, quantity: +quantity };
        });

        const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;

        let images: string[];
        if (imagesMulter.length === 0 && oldImages) {
            images = JSON.parse(oldImages);
        } else {
            images = imagesMulter.map(img => `${baseUrl}/images/products/${img.originalname}`);
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, { name, description, price, orgPrice, images, hot, color, types: typesFormatted, categoryId });

        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
    const productId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(productId)) {
            throw createHttpError(400, 'Invalid product ID.');
        }

        const product = await ProductModel.findById(productId).exec();

        if (!product) {
            throw createHttpError(404, 'Product not found.');
        }

        await ProductModel.updateOne({ _id: productId }, { isDeleted: true }).exec();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};