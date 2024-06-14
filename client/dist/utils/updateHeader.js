var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from "../api/apiData.js";
import { formatPrice } from "./helpers.js";
const quantityCartHeader = document.querySelector('.cart_site li:nth-child(2) span');
const priceCartHeader = document.querySelector('.cart_site li:nth-child(3) b');
function updateQuantityCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    quantityCartHeader.innerText = (cartData.length > 99 ? '99+' : cartData.length) || 0;
    return cartData;
}
function updateTotalPriceCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cartData.reduce((acc, cur) => acc += +cur.price * cur.quantity, 0);
    priceCartHeader.innerText = formatPrice(totalPrice) || formatPrice(0);
    return cartData;
}
export function updateLikesHeader() {
    return __awaiter(this, void 0, void 0, function* () {
        const likeBox = document.querySelector('.likes-box');
        const likesArr = JSON.parse(localStorage.getItem('likes')) || [];
        document.querySelector('.cart_site li:first-child span').innerHTML = likesArr.length;
        if (!likesArr.length) {
            likeBox.innerHTML = '';
            likeBox.insertAdjacentHTML('beforeend', '<small>Chưa có sản phẩm</small>');
            return;
        }
        const promises = likesArr.map((id) => __awaiter(this, void 0, void 0, function* () { return yield getData('products', id); }));
        const productLiked = yield Promise.all(promises);
        const html = `<table>
                    ${productLiked.map(prod => `<tr>
                            <td>
                                <a href="detail.html?cate=${prod.categoryId}&id=${prod._id}">
                                    <image src='${prod.images[0]}' />
                                </a>
                            </td>
                            <td>
                                <a href="detail.html?cate=${prod.categoryId}&id=${prod._id}" class="like-name">${prod.name}</a>
                            </td>
                            <td>
                                <div class="del-like" data-del="${prod._id}">x</div>
                            </td>
                        </tr>`).join('')}
                </table>`;
        likeBox.innerHTML = '';
        likeBox.insertAdjacentHTML('beforeend', html);
    });
}
export default function updateHeader() {
    updateQuantityCartHeader();
    updateTotalPriceCartHeader();
    updateLikesHeader();
}
