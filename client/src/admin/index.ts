import initCategories from "./categories/categoryRows.js";
import initProducts from "./products/productRows.js";

const sideBar = document.querySelector('.sidebar_menu')!;
const mainContainer = document.querySelector('main') as HTMLDivElement;

type TPage = 'category' | 'product' | 'user' | 'blog' | 'role' | 'dashboard' | 'order';

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
        initCategories(mainContainer);
    }

    if (page === 'product') {
        initProducts(mainContainer);
    }

    if (page === 'user') {
        console.log('user');
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