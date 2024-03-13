import { getProducts } from "../../api/apiProducts.js";
import { isAlreadyLiked } from "../../utils/addLike.js";
import { formatPrice } from "../../utils/formatPrice.js";
import { loader } from "../../utils/loader.js";

export function noResult(container, message) {
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', `<div class="empty_prods">${message}</div>`);
}

export function generatePagination(container, totalPages, curPage) {
    let markup = '';

    for (let i = 0; i < totalPages; i++) {
        markup += `<a href="#" data-page=${i} class=${curPage === i ? 'active' : ''}>${i + 1}</a>`;
    }

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export async function generateProducts(container, filteredProducts) {
    container.innerHTML = '';
    await loader(container, 1000);

    const orgProducts = await getProducts();

    if (!orgProducts.length) {
        noResult(container, 'Không có sản phẩm nào.');
        return;
    }

    let markup = '';

    const totalResults = filteredProducts.length === 0 ? orgProducts.length : filteredProducts.length;

    (filteredProducts.length === 0 ? orgProducts : filteredProducts).map(product => {
        const { id, category, name, price, orgPrice, purchased, mass, images } = product;
        const discount = 100 - +(price / orgPrice * 100).toFixed(0);

        markup += `<div class="item_col">
                    <div class="item">
                        <span class="sale_ribbon">${discount > 0 ? `-${discount}%` : ''}</span>
                        <div class="item_pic">
                            <img src="./images/products/${images[0]}" alt="${name}">
                            <ul class="item_pic_hover">
                                <li><a href="#" class="${isAlreadyLiked(id) ? 'active' : ''}" data-like=${id}><i class="fa fa-heart"></i></a></li>
                                <li><a href="detail.html?cate=${category}&id=${id}"><i class="fa fa-eye" aria-hidden="true"></i></a></li>
                                <li><a href="#" data-cart=${id}><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="item_text">
                            <h6><a href="detail.html?cate=${category}&id=${id}">${name}</a></h6>
                            <div class="under">
                                <h5><del>${formatPrice(orgPrice)}</del><span>${formatPrice(price)}</span><span class="mass">/${mass}</span></h5>
                                <p><span>Lượt mua: ${purchased}</span></p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join('');

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);

    return totalResults || 0;
}