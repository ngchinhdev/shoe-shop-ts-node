import { IProduct } from "../../types/products.js";
import { formatPrice } from "../../utils/helpers.js";
import { loaderDot } from "../../utils/loaders.js";

export async function generateProducts(container: HTMLDivElement, filteredProducts: IProduct[]) {
    await loaderDot(container, 500);

    let markup = '';

    filteredProducts.map(product => {
        const { _id, name, price, orgPrice, description, images } = product;

        if (!name || !price || !orgPrice || !description || !images?.length) return;

        let discount = 0;
        if (orgPrice && price !== orgPrice) {
            discount = 100 - +(price / orgPrice * 100).toFixed(0);
        }

        markup += `<div class="item_col product-style">
                    <div class="item">
                        ${discount > 0 ? `<span class="sale_ribbon">${`-${discount}%`}</span>` : ''}
                        <div class="item_pic">
                            <img src="${images[0]}" alt="${name}">
                            <ul class="item_pic_hover">
                                <li><a href="#" class="" data-like=${_id}><i class="fa fa-heart"></i></a></li>
                                <li><a href="detail.html?cate=${''}&id=${_id}"><i class="fa fa-eye" aria-hidden="true"></i></a></li>
                                <li><a href="#" data-cart=${_id}><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="item_text">
                            <h6><a href="detail.html?cate=${''}&id=${_id}">${name}</a></h6>
                            <div class="under">
                                <p><span class="cate-in-prod">Brand: Nike</span></p>
                                <h5><del>${formatPrice(orgPrice)}</del><span>${formatPrice(price)}</span></h5>
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join('');

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}