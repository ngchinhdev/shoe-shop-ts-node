import { generateMenuCategories } from "./markups/categoriesMarkup.js";
import { updateHeader, updateLikesHeader } from "../utils/updateHeader.js";
import { getUser } from "../api/apiUsers.js";
import { handleDeleteLiked } from "../utils/addLike.js";

const barCategory = document.querySelector('.toggle');
const menuCate = document.querySelector('.list_cate');
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const likeBtn = document.querySelector('.cart_site li:first-child');

// Toggle category bar 
barCategory.addEventListener('click', function () {
    if (menuCate.style.maxHeight) {
        menuCate.style.maxHeight = null;
    } else {
        menuCate.style.maxHeight = menuCate.scrollHeight + 'px';
    }
});

// Search bar
function search() {
    if (!searchBox.value) {
        searchBox.focus();
        return;
    }

    window.location.href = `product.html?query=${searchBox.value}`;
}

searchBox.addEventListener('keyup', (e) => e.key !== 'Enter' ? null : search());
searchBtn.addEventListener('click', search);

await generateMenuCategories();

const paramsUrl = window.location.href;
if (paramsUrl.includes('index.html')) menuCate.style.maxHeight = menuCate.scrollHeight + 'px';
updateHeader();
if (paramsUrl.includes('query')) searchBox.value = paramsUrl.slice(paramsUrl.indexOf('=') + 1);

// Login status
async function handleLogin() {
    let isLogin = localStorage.getItem('isLogin');

    if (!isLogin) localStorage.setItem('isLogin', '');
    if (isLogin) {
        const logoutBtn = document.querySelector('.logout');

        const loggedUser = await getUser(`?id=${isLogin}`);

        document.querySelector('.login.ic').innerHTML = `<span class="logged">Hi, ${loggedUser[0].name.split(' ')[0]}</span>`;
        document.querySelector('.logged').addEventListener('click', () => logoutBtn.classList.toggle('active'));

        logoutBtn.addEventListener('click', function () {
            localStorage.setItem('isLogin', '');
            window.location.href = 'index.html';
        });
    }
}

handleLogin();

await updateLikesHeader();

// Click like btn in header
likeBtn.addEventListener('click', function () {
    document.querySelector('.likes-box').classList.toggle('active');
});

// Delete liked product
document.querySelector('.likes-box').addEventListener('click', async function (e) {
    const delLikedBtn = e.target;

    e.stopPropagation();

    if (!delLikedBtn.classList.contains('del-like')) return;

    const likedId = delLikedBtn.dataset.del;

    await handleDeleteLiked(likedId);
});