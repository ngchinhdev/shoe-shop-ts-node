import { NextFunction, Request, Response } from "express";

import BlogModel from "../models/Blog";

export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await BlogModel.find();

        if (!blogs.length) {
            return res.status(404).json({ error: 'No blog found.' });
        }

        return res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};