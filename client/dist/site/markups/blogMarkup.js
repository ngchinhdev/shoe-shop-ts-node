var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formatDate } from "../../utils/helpers.js";
import { loaderDot } from "../../utils/loaders.js";
export function generateBlogs(container, blogs) {
    return __awaiter(this, void 0, void 0, function* () {
        yield loaderDot(container);
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', blogs.map(blog => `<div class="blog_col">
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
               </div>`).join(''));
    });
}
