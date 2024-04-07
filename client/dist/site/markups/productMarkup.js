var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from "../../api/apiData.js";
import { formatPrice } from "../../utils/helpers.js";
import { loaderDot } from "../../utils/loaders.js";
export function noResult(container, message) {
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', `<div class="empty_prods">${message}</div>`);
}
export function generatePagination(container, totalPages, curPage = 0) {
    let markup = '';
    for (let i = 0; i < totalPages; i++) {
        markup += `<a href="#" data-page=${i} class=${curPage === i ? 'active' : ''}>${i + 1}</a>`;
    }
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}
export function generateProducts(container, filteredProducts) {
    return __awaiter(this, void 0, void 0, function* () {
        yield loaderDot(container, 500);
        let markup = '';
        if (!(filteredProducts === null || filteredProducts === void 0 ? void 0 : filteredProducts.length))
            return noResult(container, 'Không tìm thấy sản phẩm nào.');
        const promiseProducts = filteredProducts.map((product) => __awaiter(this, void 0, void 0, function* () {
            const { _id, name, price, orgPrice, description, images, categoryId, hot } = product;
            if (!name || !price || !orgPrice || !description || !(images === null || images === void 0 ? void 0 : images.length) || !categoryId)
                return;
            let discount = 0;
            if (orgPrice && price !== orgPrice) {
                discount = 100 - +(price / orgPrice * 100).toFixed(0);
            }
            const category = yield getData('categories', categoryId);
            return `<div class="item_col product-style">
                    <div class="item">
                        ${discount > 0 ? `<span class="sale_ribbon">${`-${discount}%`}</span>` : ''}
                        ${hot ? `<span class="hot_ribbon">HOT</span>` : ''}
                        <div class="item_pic">
                            <img src="${images[0]}" alt="${name}">
                            <ul class="item_pic_hover">
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
        }));
        markup = yield Promise.all(promiseProducts).then(data => data.join(''));
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', markup);
    });
}
