"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogs_1 = require("../controllers/blogs");
const uploadFiles_1 = __importDefault(require("../utils/uploadFiles"));
const router = (0, express_1.Router)();
router.get('/', blogs_1.getBlogs);
router.get('/categoryName/:categoryName', blogs_1.getBlogByCategoryName);
router.get('/:id', blogs_1.getBlog);
router.post('/', uploadFiles_1.default.single('thumbnail'), blogs_1.createBlog);
router.put('/:id', uploadFiles_1.default.single('thumbnail'), blogs_1.updateBlog);
router.delete('/:id', blogs_1.deleteBlog);
exports.default = router;
