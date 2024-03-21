import { getFullData } from "../api/apiData.js";
import { type ICategory } from "../types/categories.js";
import { generateMenuCategories } from "./markups/categoryMarkup.js";

const barCategory = document.querySelector('.toggle') as HTMLElement;
const menuCategory = document.querySelector('.list_cate') as HTMLUListElement;
const searchBox = document.querySelector('.search input') as HTMLElement;
const searchBtn = document.querySelector('.search button') as HTMLElement;
const likeBtn = document.querySelector('.cart_site li:first-child') as HTMLElement;


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
})();

// Search bar
// function search(): void {
//     if (!searchBox) return;

//     if (!searchBox.value) {
//         searchBox.focus();
//         return;
//     }

//     window.location.href = `product.html?query=${searchBox.value}`;
// }

// if (searchBox && searchBtn) {
//     searchBox.addEventListener('keyup', (e) => {
//         if (e.key === 'Enter') search();
//     });
//     searchBtn.addEventListener('click', search);
// }

// async function generatemenuCategorygories(): Promise<void> {
//     // Function body for generating menu categories
// }

// // Function body for updateHeader()

// if (paramsUrl.includes('query') && searchBox) {
//     searchBox.value = paramsUrl.slice(paramsUrl.indexOf('=') + 1);
// }
