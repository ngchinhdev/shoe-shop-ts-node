import { RequestHandler } from "express";

import BlogModel from "../models/Blog";
import { IBlog, IBlogParams } from "../types/blogs";

export const getBlogs: RequestHandler = async (req, res, next) => {
    try {
        const blogs = await BlogModel.find({ isDeleted: false });

        if (!blogs.length) {
            return res.status(404).json({ error: 'No blog found.' });
        }

        return res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};

export const getBlog: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (!id) return res.status(400).json({ error: 'Invalid blog ID.' });

        const blog = await BlogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'No blog found.' });
        }

        return res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

export const createBlog: RequestHandler<unknown, unknown, IBlog, unknown> = async (req, res, next) => {
    const { title, content, category } = req.body;
    const imageMulter = req.file as Express.Multer.File;

    try {
        if (!title || !content || !category || !imageMulter) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        const thumbnail = `${req.protocol}://${req.hostname}:${process.env.PORT}/images/blogs/${imageMulter.originalname}`;

        const blog = new BlogModel({ title, content, thumbnail, category });

        await blog.save();

        return res.status(201).json(blog);
    } catch (error) {
        next(error);
    }
};

export const updateBlog: RequestHandler<IBlogParams, unknown, IBlog, unknown> = async (req, res, next) => {
    const { title, content, category, oldThumbnail } = req.body;
    const imageMulter = req.file as Express.Multer.File;

    try {
        if (!title || !content || !category) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        let thumbnail: string;

        if (!imageMulter && oldThumbnail) {
            thumbnail = oldThumbnail;
        } else {
            thumbnail = `${req.protocol}://${req.hostname}:${process.env.PORT}/images/blogs/${imageMulter.originalname}`;
        }

        const blog = await BlogModel.findByIdAndUpdate(req.params.id, { title, content, thumbnail, category });

        if (!blog) {
            return res.status(404).json({ error: 'No blog found.' });
        }

        return res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

export const deleteBlog: RequestHandler<IBlogParams> = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (!id) return res.status(400).json({ error: 'Invalid blog ID.' });

        const blog = await BlogModel.updateOne({ _id: id }, { isDeleted: true });

        if (!blog) {
            return res.status(404).json({ error: 'No blog found.' });
        }

        return res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};