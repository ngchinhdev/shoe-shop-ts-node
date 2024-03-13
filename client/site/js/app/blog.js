import { getBlogs, getBlogsByCategory } from "../api/apiBlogs.js";
import { generateBlogs, generateCategoriesBlog } from "./markups/blogsMarkup.js";

const blogContainerCate = document.querySelector('.nav_cate');
const blogContainer = document.querySelector('.blog_row');

async function init() {
    const blogs = await getBlogs();

    generateBlogs(blogContainer, blogs);
    generateCategoriesBlog(blogContainerCate);

    blogContainerCate.addEventListener('click', async function (e) {
        const btn = e.target;
        if (!btn.hasAttribute('data-blog')) return;

        const cateId = +btn.dataset.blog;

        blogContainerCate.querySelector('.active').classList.remove('active');
        btn.classList.add('active');

        if (isNaN(cateId)) {
            generateBlogs(blogContainer, blogs);
            return;
        }

        const filteredBlogs = await getBlogsByCategory(cateId);

        generateBlogs(blogContainer, filteredBlogs);
    });
}

init();