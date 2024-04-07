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
import updateHeader from "../utils/updateHeader.js";
import { generateMenuCategories } from "./markups/categoryMarkup.js";
const barCategory = document.querySelector('.toggle');
const menuCategory = document.querySelector('.list_cate');
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
function search() {
    if (!searchBox)
        return;
    if (!searchBox.value) {
        searchBox.focus();
        return;
    }
    window.location.href = `product.html?query=${searchBox.value}`;
}
function handleLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        let isLogin = localStorage.getItem('accessToken');
        if (!isLogin)
            localStorage.setItem('accessToken', '');
        if (isLogin) {
            const logoutBtn = document.querySelector('.logout');
            // const loggedUser = await getData();
            document.querySelector('.login.ic').innerHTML = `<span class="logged">Hi, You</span>`;
            document.querySelector('.logged').addEventListener('click', () => logoutBtn.classList.toggle('active'));
            logoutBtn.addEventListener('click', function () {
                localStorage.setItem('accessToken', '');
                window.location.href = 'index.html';
            });
        }
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield getFullData('categories');
        const paramsUrl = window.location.href;
        yield generateMenuCategories(menuCategory, categories);
        if (paramsUrl.includes('index.html')) {
            menuCategory.style.maxHeight = menuCategory.scrollHeight + 'px';
        }
        // Toggle category bar 
        barCategory.addEventListener('click', function () {
            if (menuCategory.style.maxHeight) {
                menuCategory.style.maxHeight = '';
            }
            else {
                if (menuCategory.scrollHeight) {
                    menuCategory.style.maxHeight = menuCategory.scrollHeight + 'px';
                }
            }
        });
        if (searchBox && searchBtn) {
            searchBox.addEventListener('keyup', (e) => {
                if (e.key === 'Enter')
                    search();
            });
            searchBtn.addEventListener('click', search);
        }
        updateHeader();
        handleLogin();
    });
})();
