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
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlog = exports.getBlogByCategoryName = exports.getBlogs = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find({ isDeleted: false });
        if (!blogs.length) {
            return res.status(404).json({ error: 'No blog found.' });
        }
        return res.status(200).json(blogs);
    }
    catch (error) {
        next(error);
    }
});
exports.getBlogs = getBlogs;
const getBlogByCategoryName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryName = req.params.categoryName;
    try {
        const blogs = yield Blog_1.default.find({ category: categoryName, isDeleted: false });
        if (!blogs.length) {
            return res.status(404).json({ error: 'No blog found.' });
        }
        return res.status(200).json(blogs);
    }
    catch (error) {
        next(error);
    }
});
exports.getBlogByCategoryName = getBlogByCategoryName;
const getBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).json({ error: 'Invalid blog ID.' });
        const blog = yield Blog_1.default.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'No blog found.' });
        }
        return res.status(200).json(blog);
    }
    catch (error) {
        next(error);
    }
});
exports.getBlog = getBlog;
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, category } = req.body;
    const imageMulter = req.file;
    try {
        if (!title || !content || !category || !imageMulter) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        const thumbnail = `${req.protocol}://${req.hostname}:${process.env.PORT}/images/blogs/${imageMulter.originalname}`;
        const blog = new Blog_1.default({ title, content, thumbnail, category });
        yield blog.save();
        return res.status(201).json(blog);
    }
    catch (error) {
        next(error);
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, category, oldThumbnail } = req.body;
    const imageMulter = req.file;
    try {
        if (!title || !content || !category) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        let thumbnail;
        if (!imageMulter && oldThumbnail) {
            thumbnail = oldThumbnail;
        }
        else {
            thumbnail = `${req.protocol}://${req.hostname}:${process.env.PORT}/images/blogs/${imageMulter.originalname}`;
        }
        const blog = yield Blog_1.default.findByIdAndUpdate(req.params.id, { title, content, thumbnail, category });
        if (!blog) {
            return res.status(404).json({ error: 'No blog found.' });
        }
        return res.status(200).json(blog);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).json({ error: 'Invalid blog ID.' });
        const blog = yield Blog_1.default.updateOne({ _id: id }, { isDeleted: true });
        if (!blog) {
            return res.status(404).json({ error: 'No blog found.' });
        }
        return res.status(200).json(blog);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBlog = deleteBlog;
