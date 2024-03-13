import initBlogs from "./blogs/blogRow.js";
import initCategories from "./categories/categoryRow.js";
import initDashboard from "./dashboard/dashboardView.js";
import initOrders from "./orders/orderInfoRow.js";
import initProducts from "./products/productRow.js";
import initRoles from "./roles/roleRow.js";
import initUsers from "./users/userRow.js";

const sideBar = document.querySelector('.sidebar_menu');
const mainContainer = document.querySelector('main');
await initDashboard(mainContainer);

// Side bar handle
sideBar.addEventListener('click', function (e) {
    e.preventDefault();

    const btn = e.target;

    if (!btn.hasAttribute('data-page')) return;

    sideBar.querySelector('.active').classList.remove('active');
    btn.closest('li').classList.add('active');
    const page = btn.dataset.page;

    handleRenderContent(page);
});

// Main view handle
async function handleRenderContent(page) {
    if (page === 'category') {
        await initCategories(mainContainer);
    }

    if (page === 'product') {
        await initProducts(mainContainer);
    }

    if (page === 'user') {
        await initUsers(mainContainer);
    }

    if (page === 'blog') {
        await initBlogs(mainContainer);
    }

    if (page === 'role') {
        await initRoles(mainContainer);
    }

    if (page === 'dashboard') {
        await initDashboard(mainContainer);
    }

    if (page === 'order') {
        await initOrders(mainContainer);
    }
}
