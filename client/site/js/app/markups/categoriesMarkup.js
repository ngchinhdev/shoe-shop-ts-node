import { getCategories } from "../../api/apiCategories.js";
import { loader } from "../../utils/loader.js";

const menuCategory = document.querySelector('.list_cate');
const highlightCategory = document.querySelector('.random_cate .container');

export async function generateMenuCategories() {
    menuCategory.innerHTML = '';

    const categories = await getCategories();

    let markup = '';

    categories.map(category => {
        markup += `<li><a href="product.html?cate=${category.id}">${category.name}</a></li>`;
    });

    menuCategory.insertAdjacentHTML('beforeend', markup);
}

export async function generateHighlightCategories() {
    highlightCategory.innerHTML = '';
    await loader(highlightCategory);

    const categories = await getCategories();

    let markup = '';

    categories.slice(0, 4).map(category => {
        markup += `<div class="item_col">
                        <div class="item">
                            <img src="./images/products/${category.image}" alt="${category.name}">
                            <h5>
                                <a href="product.html?cate=${category.id}">${category.name}</a>
                            </h5>
                        </div>
                    </div>`;
    });

    highlightCategory.innerHTML = '';
    highlightCategory.insertAdjacentHTML('beforeend', markup);
}