import { getData, getFullData } from "../api/apiData.js";
import { generateBlogs } from "./markups/blogMarkup.js";

const blogContainer = document.querySelector('.blog_row') as HTMLDivElement;
const blogContainerCate = document.querySelector('.nav_cate') as HTMLDivElement;

(async function () {
    const blogs = await getFullData('blogs');

    await generateBlogs(blogContainer, blogs);

    blogContainerCate.addEventListener('click', async function (e) {
        const btn = e.target as HTMLLIElement;
        if (!btn.hasAttribute('data-blog')) return;

        const cateId = btn.dataset.blog!;

        blogContainerCate.querySelector('.active')!.classList.remove('active');
        btn.classList.add('active');

        if (cateId === 'all') {
            generateBlogs(blogContainer, blogs);
            return;
        }

        const filteredBlogs = await getFullData('blogs/categoryName/' + cateId);

        generateBlogs(blogContainer, filteredBlogs);
    });
})();
