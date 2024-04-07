import { Router } from "express";
import { createBlog, deleteBlog, getBlog, getBlogByCategoryName, getBlogs, updateBlog } from "../controllers/blogs";
import uploadFiles from "../utils/uploadFiles";

const router = Router();

router.get('/', getBlogs);

router.get('/categoryName/:categoryName', getBlogByCategoryName);

router.get('/:id', getBlog);

router.post('/', uploadFiles.single('thumbnail'), createBlog);

router.put('/:id', uploadFiles.single('thumbnail'), updateBlog);

router.delete('/:id', deleteBlog);

export default router;