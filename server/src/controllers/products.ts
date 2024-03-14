import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

import { type IProduct } from "../types/products";

import ProductModel from "../models/Product";

export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await ProductModel.find().exec();

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
    const { name, description, price, orgPrice, images, hot, color, types, categoryId } = req.body;

    try {
        if (!name || !description || !price || !orgPrice || !images || !color || !types || !categoryId) {
            throw createHttpError(400, 'Missing required fields.');
        }

        const product = await ProductModel.create({ name, description, price, orgPrice, images, hot, color, types, categoryId });

        res.status(201).json(product);
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

        await ProductModel.deleteOne({ _id: productId });

        res.status(204);
    } catch (error) {
        next(error);
    }
};