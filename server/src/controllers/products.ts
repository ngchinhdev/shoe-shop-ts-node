import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

import { type IProductParams, type IProduct } from "../types/products";

import ProductModel from "../models/Product";

export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await ProductModel.find({ isDeleted: false }).exec();
        if (products.length === 0) {
            throw createHttpError(404, 'No products found.');
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProduct: RequestHandler = async (req, res, next) => {
    const productId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(productId)) {
            throw createHttpError(400, 'Invalid product ID.');
        }

        const product = await ProductModel.findById(req.params.id).exec();

        if (!product) {
            throw createHttpError(404, 'Product not found.');
        }

        res.status(200).json(product);
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

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, { name, description, price, orgPrice, images, hot, color, types: typesFormatted, categoryId }, { new: true });

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