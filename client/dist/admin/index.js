var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CategorySkeleton from "./CategorySkeleton.js";
import ProductSkeleton from "./ProductSkeleton.js";
import UserSkeleton from "./UserSkeleton.js";
const sideBar = document.querySelector('.sidebar_menu');
// Side bar handler
sideBar.addEventListener('click', function (e) {
    e.preventDefault();
    const btn = e.target;
    if (!btn.hasAttribute('data-page'))
        return;
    sideBar.querySelector('.active').classList.remove('active');
    btn.closest('li').classList.add('active');
    const page = btn.dataset.page;
    handleRenderContent(page);
});
// Main view handler
function handleRenderContent(page) {
    return __awaiter(this, void 0, void 0, function* () {
        if (page === 'category') {
            new CategorySkeleton().initialize('categories');
        }
        if (page === 'product') {
            new ProductSkeleton().initialize('products');
        }
        if (page === 'user') {
            new UserSkeleton().initialize('users');
        }
        if (page === 'blog') {
            console.log('blog');
        }
        if (page === 'dashboard') {
            console.log('dashboard');
        }
        if (page === 'order') {
            console.log('order');
        }
    });
}
