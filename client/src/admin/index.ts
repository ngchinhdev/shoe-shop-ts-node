import { type TPage } from "../types/pagesAdmin.js";
import CategorySkeleton from "./CategorySkeleton.js";
import ProductSkeleton from "./ProductSkeleton.js";
import UserSkeleton from "./UserSkeleton.js";

const sideBar = document.querySelector('.sidebar_menu')!;

// Side bar handler
sideBar.addEventListener('click', function (e: Event) {
    e.preventDefault();

    const btn = e.target as HTMLElement;

    if (!btn.hasAttribute('data-page')) return;

    sideBar!.querySelector('.active')!.classList.remove('active');
    btn.closest('li')!.classList.add('active');
    const page = btn.dataset.page as TPage;
    handleRenderContent(page);
});

// Main view handler
async function handleRenderContent(page: string) {
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
}