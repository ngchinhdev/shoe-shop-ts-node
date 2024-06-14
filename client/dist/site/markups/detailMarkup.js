var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formatPrice } from "../../utils/helpers.js";
import { loaderDot } from "../../utils/loaders.js";
export function generateInfoProduct(container, product) {
    return __awaiter(this, void 0, void 0, function* () {
        yield loaderDot(container, 500);
        const { _id, name, price, orgPrice, images, description, types } = product;
        if (!_id || !name || !price || !orgPrice || !images || !description || !(types === null || types === void 0 ? void 0 : types.length))
            return;
        const navigationBar = document.querySelector('.navigation_bar ul');
        navigationBar.insertAdjacentHTML('beforeend', `<li>
                                                        <span> <i class="fa fa-angle-right"></i> </span>
                                                        <a href="detail.html?id=${_id}">${name}</a>
                                                    </li>`);
        const informationMarkup = `<div class="detail_images detail_col">
                                    <div class="small_pics">
                                        ${images.map(image => `<div class="pic_col">
                                            <img src="${image}" alt="Product">
                                        </div>`).join('')}
                                    </div>
                                    <div class="main_pic">
                                        <img src="${images[0]}" alt="Product">
                                    </div>
                                </div>
                                <div class="product_details_text detail_col">
                                    <h3>${name}</h3>
                                    <div class="product_details_price">
                                        <del>${formatPrice(orgPrice)}</del>
                                        <span>${formatPrice(price)}</span>
                                    </div>
                                    <p>${description}</p>
                                    <div class="product_details_quantity">
                                        <div class="quantity">
                                            <div class="pro_qty">
                                                <span class="dec qtybtn">-</span>
                                                <input type="number" class="ip-qtt" min="1" value="1">
                                                <span class="inc qtybtn">+</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" data-cart=${_id} class="primary_btn add_cart">+ GIỎ HÀNG</a>
                                    <a href="checkout.html?id=${_id}&quantity=1" class="primary_btn buy_now">MUA NGAY</a>
                                </div>`;
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', informationMarkup);
    });
}
;
;
// <div class="sizes">
//     <span>Sizes:</span>
//     <ul>
//         ${types.map(type => `<li class="${type.quantity ? '' : 'disabled'}">${type.size}</li>`).join('')}
//     </ul>
// </div>
