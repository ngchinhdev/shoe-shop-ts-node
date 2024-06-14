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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find({ isDeleted: false }).exec();
        if (categories.length === 0) {
            res.status(200).json({ message: 'No categories found.' });
        }
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    try {
        if (!categoryId) {
            res.status(400).json({ message: 'Invalid category ID.' });
        }
        const category = yield Category_1.default.findById(categoryId).exec();
        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const imageMulter = req.file;
    try {
        if (!name || !imageMulter) {
            res.status(400).json({ message: 'Missing required fields.' });
        }
        const image = `${req.protocol}://${req.hostname}:${process.env.PORT}/images/categories/${imageMulter.originalname}`;
        const category = yield Category_1.default.create({ name, image });
        res.status(201).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const { name, oldImage } = req.body;
    const imageMulter = req.file;
    try {
        if (!categoryId) {
            res.status(400).json({ message: 'Invalid category ID.' });
        }
        const category = yield Category_1.default.findById(categoryId).exec();
        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
        }
        let image;
        if (!imageMulter && oldImage) {
            image = oldImage;
        }
        else {
            image = `${req.protocol}://${req.hostname}:${process.env.PORT}/images/categories/${imageMulter.originalname}`;
        }
        yield Category_1.default.updateOne({ _id: categoryId }, { name, image }).exec();
        res.status(204).json({ message: 'Category updated successfully.' });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    try {
        if (!categoryId) {
            res.status(400).json({ message: 'Invalid category ID.' });
        }
        const category = yield Category_1.default.findById(categoryId).exec();
        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
        }
        yield Category_1.default.updateOne({ _id: categoryId }, { isDeleted: true }).exec();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
