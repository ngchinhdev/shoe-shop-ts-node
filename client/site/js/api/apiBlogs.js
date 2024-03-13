import { BASE_URL, getData } from "./apiData.js";

const BLOG_URL = 'blogs';

export async function getBlogs() {
    const blogs = await getData(BLOG_URL);

    return blogs;
}

export async function getBlog(idBlog) {
    const blog = await getData(`${BLOG_URL}/${idBlog}`);

    return blog;
}

export async function getBlogsByCategory(cateId) {
    const blogs = await getData(BLOG_URL);

    const filteredBlogs = blogs.filter(blog => blog.category === cateId);

    return filteredBlogs;
}

export async function getCategoriesBlog() {
    const categoriesBlog = await getData('categoriesBlog');

    return [...categoriesBlog];
}

export async function addBlog(newBlog) {
    try {
        const response = await fetch(`${BASE_URL}/${BLOG_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBlog),
        });

        if (!response.ok) {
            throw new Error('Failed to add a new blog');
        }
    } catch (error) {
        console.error('An error occurred when add new blog:', error.message);
    }
}

export async function updateBlog(idBlog, updateBlog) {
    try {
        const response = await fetch(`${BASE_URL}/${BLOG_URL}/${idBlog}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateBlog),
        });

        if (!response.ok) {
            throw new Error('Failed to update item');
        }
    } catch (error) {
        console.error('An error occurred when update category:', error.message);
    }
}

export async function deleteBlog(idBlog) {
    try {
        const response = await fetch(`${BASE_URL}/${BLOG_URL}/${idBlog}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }
    } catch (error) {
        console.error('An error occurred when delete blog: ', error.message);
    }
}


