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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getHotProducts = exports.getProductsByCategoryName = exports.getProductsByCategoryId = exports.getProductBySearchName = exports.getProductById = exports.getProducts = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../models/Product"));
const Category_1 = __importDefault(require("../models/Category"));
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    const sortQuery = req.query.sort || '';
    try {
        let sortOption = {};
        let pageNumber;
        let limitNumber;
        if (sortQuery && typeof sortQuery === 'string') {
            if (sortQuery.startsWith('-')) {
                sortOption[sortQuery.substring(1)] = -1;
            }
            else {
                sortOption[sortQuery] = 1;
            }
        }
        if (page && limit) {
            pageNumber = +page;
            limitNumber = +limit;
        }
        else if (!page && limit) {
            pageNumber = 1;
            limitNumber = +limit;
        }
        else if (page && !limit) {
            pageNumber = +page;
            limitNumber = 100;
        }
        else {
            pageNumber = 1;
            limitNumber = 100;
        }
        const skip = (pageNumber - 1) * limitNumber;
        const products = yield Product_1.default.find({ isDeleted: false }).skip(skip).limit(limitNumber).sort(sortOption).exec();
        if (products.length === 0) {
            throw (0, http_errors_1.default)(404, 'No products found.');
        }
        return res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield Product_1.default.findById(productId, { isDeleted: false }).exec();
        if (!product) {
            throw (0, http_errors_1.default)(404, 'Product not found.');
        }
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const getProductBySearchName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const products = yield Product_1.default.find({ name: { $regex: `.*${name}*.`, $options: 'i' }, isDeleted: false }).exec();
        if (products.length === 0) {
            throw (0, http_errors_1.default)(404, 'No products found.');
        }
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductBySearchName = getProductBySearchName;
const getProductsByCategoryId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    try {
        const products = yield Product_1.default.find({ categoryId, isDeleted: false }).exec();
        if (products.length === 0) {
            throw (0, http_errors_1.default)(404, 'No products found.');
        }
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductsByCategoryId = getProductsByCategoryId;
const getProductsByCategoryName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryName = req.params.name;
    try {
        const category = yield Category_1.default.findOne({ name: { $regex: categoryName, $options: 'i' } }).exec();
        if (!category) {
            throw (0, http_errors_1.default)(404, 'Category not found.');
        }
        const products = yield Product_1.default.find({ categoryId: category._id, isDeleted: false }).exec();
        if (products.length === 0) {
            throw (0, http_errors_1.default)(404, 'No products found.');
        }
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductsByCategoryName = getProductsByCategoryName;
const getHotProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find({ hot: true, isDeleted: false }).exec();
        if (products.length === 0) {
            throw (0, http_errors_1.default)(404, 'No hot products found.');
        }
        return res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getHotProducts = getHotProducts;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, orgPrice, hot, color, types, categoryId } = req.body;
    let imagesMulter = req.files;
    try {
        if (!name || !description || !price || !orgPrice || !imagesMulter || !color || !categoryId) {
            throw (0, http_errors_1.default)(400, 'Missing required fields.');
        }
        const typesFormatted = types === null || types === void 0 ? void 0 : types.split(',').map(type => {
            const [size, quantity] = type.split('/');
            return { size: +size, quantity: +quantity };
        });
        const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;
        const images = imagesMulter.map(img => `${baseUrl}/images/products/${img.originalname}`);
        const product = yield Product_1.default.create({ name, description, price, orgPrice, images, hot, color, categoryId });
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const { name, description, price, orgPrice, hot, color, types, categoryId, oldImages } = req.body;
    let imagesMulter = req.files;
    try {
        if (!mongoose_1.default.isValidObjectId(productId)) {
            throw (0, http_errors_1.default)(400, 'Invalid product ID.');
        }
        const product = yield Product_1.default.findById(productId).exec();
        if (!product) {
            throw (0, http_errors_1.default)(404, 'Product not found.');
        }
        const typesFormatted = types === null || types === void 0 ? void 0 : types.split(',').map(type => {
            const [size, quantity] = type.split('/');
            return { size: +size, quantity: +quantity };
        });
        const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;
        let images;
        if (imagesMulter.length === 0 && oldImages) {
            images = JSON.parse(oldImages);
        }
        else {
            images = imagesMulter.map(img => `${baseUrl}/images/products/${img.originalname}`);
        }
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(productId, { name, description, price, orgPrice, images, hot, color, types: typesFormatted, categoryId });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(productId)) {
            throw (0, http_errors_1.default)(400, 'Invalid product ID.');
        }
        const product = yield Product_1.default.findById(productId).exec();
        if (!product) {
            throw (0, http_errors_1.default)(404, 'Product not found.');
        }
        yield Product_1.default.updateOne({ _id: productId }, { isDeleted: true }).exec();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
