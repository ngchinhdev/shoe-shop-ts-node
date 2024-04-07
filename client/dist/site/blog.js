var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getFullData } from "../api/apiData.js";
import { generateBlogs } from "./markups/blogMarkup.js";
const blogContainer = document.querySelector('.blog_row');
const blogContainerCate = document.querySelector('.nav_cate');
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const blogs = yield getFullData('blogs');
        yield generateBlogs(blogContainer, blogs);
        blogContainerCate.addEventListener('click', function (e) {
            return __awaiter(this, void 0, void 0, function* () {
                const btn = e.target;
                if (!btn.hasAttribute('data-blog'))
                    return;
                const cateId = btn.dataset.blog;
                blogContainerCate.querySelector('.active').classList.remove('active');
                btn.classList.add('active');
                if (cateId === 'all') {
                    generateBlogs(blogContainer, blogs);
                    return;
                }
                const filteredBlogs = yield getFullData('blogs/categoryName/' + cateId);
                generateBlogs(blogContainer, filteredBlogs);
            });
        });
    });
})();
