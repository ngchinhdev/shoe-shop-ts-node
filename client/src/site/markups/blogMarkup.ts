import { type IBlog } from "../../types/blogs.js";
import { formatDate } from "../../utils/helpers.js";
import { loaderDot } from "../../utils/loaders.js";

export async function generateBlogs(container: HTMLElement, blogs: IBlog[]) {
    await loaderDot(container);

    container.innerHTML = '';

    container.insertAdjacentHTML('beforeend', blogs.map(blog =>
        `<div class="blog_col">
                   <div class="blog_item">
                       <div class="blog_pic">
                           <img src="${blog.thumbnail}" alt="${blog.title}">
                       </div>
                       <div class="blog_text">
                           <div class="cate_blog">${blog.category}</div>
                           <ul>
                               <li><i class="fa fa-calendar-o"></i>${formatDate(blog.createAt)}</li>
                           </ul>
                           <h5><a href="#">${blog.title}</a></h5>
                           <p>${blog.content}</p>
                       </div>
                   </div>
               </div>`
    ).join(''));
}