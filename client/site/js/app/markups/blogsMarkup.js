import { getBlogs, getCategoriesBlog } from "../../api/apiBlogs.js";
import { formatDate } from "../../utils/helper.js";
import { loader } from "../../utils/loader.js";

export async function generateCategoriesBlog(container) {
    let markup = '<li class="active" data-blog="all">Tất cả</li>';

    const categoriesBlog = await getCategoriesBlog();

    categoriesBlog.map(cate => {
        markup += `<li data-blog=${cate.id} >${cate.name}</li>`;
    });

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export async function generateBlogs(container, blogs) {
    container.innerHTML = '';
    await loader(container, 500);

    const categoriesBlog = await getCategoriesBlog();

    let markup = '';

    blogs.map(blog => {
        const curCate = categoriesBlog.find(cate => +cate.id == blog.category);

        markup += `<div class="blog_col">
                    <div class="blog_item">
                        <div class="blog_pic">
                            <img src="./images/blogs/${blog.thumbnail}" alt="${blog.title}">
                        </div>
                        <div class="blog_text">
                            <div class="cate_blog">${curCate.name}</div>
                            <ul>
                                <li><i class="fa fa-calendar-o"></i>${formatDate(blog.createAt)}</li>
                                <li><i class="fa fa-comment-o"></i> ${blog.comments}</li>
                            </ul>
                            <h5><a href="#">${blog.title}</a></h5>
                            <p>${blog.contents}</p>
                        </div>
                    </div>
                </div>`;
    });

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}