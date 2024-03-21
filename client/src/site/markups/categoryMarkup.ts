import { ICategory } from "../../types/categories.js";
import { loaderDot } from "../../utils/loaders.js";

export async function generateMenuCategories(container: HTMLUListElement, categories: ICategory[]) {
    container.innerHTML = '';

    container.insertAdjacentHTML('beforeend', categories.map(category =>
        `<li><a href="product.html?cate=${category._id}">${category.name}</a></li>`
    ).join(''));
}

export async function generateHighlightCategories(container: HTMLDivElement, categories: ICategory[]) {
    await loaderDot(container);

    let markup = '';

    categories.map(category => {
        markup += `<div class="item_col">
                        <div class="item">
                            <img src="${category.image}" alt="${category.name}">
                            <h5>
                                <a href="product.html?cate=${category._id}">${category.name}</a>
                            </h5>
                        </div>
                    </div>`;
    });

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}