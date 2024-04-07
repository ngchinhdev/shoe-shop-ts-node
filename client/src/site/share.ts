import { getData, getFullData } from "../api/apiData.js";
import { type ICategory } from "../types/categories.js";
import updateHeader from "../utils/updateHeader.js";
import { generateMenuCategories } from "./markups/categoryMarkup.js";

const barCategory = document.querySelector('.toggle') as HTMLElement;
const menuCategory = document.querySelector('.list_cate') as HTMLUListElement;
const searchBox = document.querySelector('.search input') as HTMLInputElement;
const searchBtn = document.querySelector('.search button') as HTMLElement;

function search(): void {
    if (!searchBox) return;

    if (!searchBox.value) {
        searchBox.focus();
        return;
    }

    window.location.href = `product.html?query=${searchBox.value}`;
}

async function handleLogin() {
    let isLogin = localStorage.getItem('accessToken');

    if (!isLogin) localStorage.setItem('accessToken', '');
    if (isLogin) {
        const logoutBtn = document.querySelector('.logout');

        // const loggedUser = await getData();

        document.querySelector('.login.ic')!.innerHTML = `<span class="logged">Hi, You</span>`;
        document.querySelector('.logged')!.addEventListener('click', () => logoutBtn!.classList.toggle('active'));

        logoutBtn!.addEventListener('click', function () {
            localStorage.setItem('accessToken', '');
            window.location.href = 'index.html';
        });
    }
}

(async function () {
    const categories: ICategory[] = await getFullData('categories');
    const paramsUrl: string = window.location.href;
    await generateMenuCategories(menuCategory, categories);

    if (paramsUrl.includes('index.html')) {
        menuCategory.style.maxHeight = menuCategory.scrollHeight + 'px';
    }

    // Toggle category bar 
    barCategory.addEventListener('click', function () {
        if (menuCategory.style.maxHeight) {
            menuCategory.style.maxHeight = '';
        } else {
            if (menuCategory.scrollHeight) {
                menuCategory.style.maxHeight = menuCategory.scrollHeight + 'px';
            }
        }
    });

    if (searchBox && searchBtn) {
        searchBox.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') search();
        });
        searchBtn.addEventListener('click', search);
    }

    updateHeader();
    handleLogin();
})();
