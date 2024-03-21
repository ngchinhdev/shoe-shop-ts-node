import { getFullData } from "../api/apiData.js";
import { generateBlogs } from "./markups/blogMarkup.js";

const blogContainer = document.querySelector('.blog_row') as HTMLElement;

(async function () {
    const blogs = await getFullData('blogs');

    await generateBlogs(blogContainer, blogs);
})();
