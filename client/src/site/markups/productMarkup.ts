import { getData } from "../../api/apiData.js";
import { ICategory } from "../../types/categories.js";
import { IProduct } from "../../types/products.js";
import { formatPrice } from "../../utils/helpers.js";
import { loaderDot } from "../../utils/loaders.js";

export function noResult(container: HTMLDivElement, message: string) {
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', `<div class="empty_prods">${message}</div>`);
}

export function generatePagination(container: HTMLDivElement, totalPages: number, curPage: number = 0) {
    let markup = '';

    for (let i = 0; i < totalPages; i++) {
        markup += `<a href="#" data-page=${i} class=${curPage === i ? 'active' : ''}>${i + 1}</a>`;
    }

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export async function generateProducts(container: HTMLDivElement, filteredProducts: IProduct[]) {
    await loaderDot(container, 500);

    let markup = '';

    const promiseProducts = filteredProducts.map(async product => {
        const { _id, name, price, orgPrice, description, images, categoryId, hot } = product;

        if (!name || !price || !orgPrice || !description || !images?.length || !categoryId) return;

        let discount = 0;
        if (orgPrice && price !== orgPrice) {
            discount = 100 - +(price / orgPrice * 100).toFixed(0);
        }

        const category: ICategory = await getData('categories', categoryId);

        return `<div class="item_col product-style">
                    <div class="item">
                        ${discount > 0 ? `<span class="sale_ribbon">${`-${discount}%`}</span>` : ''}
                        ${hot ? `<span class="hot_ribbon">HOT</span>` : ''}
                        <div class="item_pic">
                            <img src="${images[0]}" alt="${name}">
                            <ul class="item_pic_hover">
                                <li><a href="#" class="" data-like=${_id}><i class="fa fa-heart"></i></a></li>
                                <li><a href="detail.html?cate=${categoryId}&id=${_id}"><i class="fa fa-eye" aria-hidden="true"></i></a></li>
                                <li><a href="#" data-cart=${_id}><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="item_text">
                            <h6><a href="detail.html?cate=${categoryId}&id=${_id}">${name}</a></h6>
                            <div class="under">
                                <p><span class="cate-in-prod">Brand: ${category.name}</span></p>
                                <h5><del>${formatPrice(orgPrice)}</del><span>${formatPrice(price)}</span></h5>
                            </div>
                        </div>
                    </div>
                </div>`;
    });

    markup = await Promise.all(promiseProducts).then(data => data.join(''));

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}