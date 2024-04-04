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
export function emptyCart(container) {
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', `<div class="empty_cart">
                                                <img src="../images/empty-cart.png" />
                                                <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                                                <a href="shop.html">
                                                    <i class="fa fa-caret-left" aria-hidden="true">
                                                </i>Quay lại mua hàng</a>
                                            </div>`);
}
export function generateCart(container, cartData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cartData.length === 0) {
            emptyCart(container);
            return false;
        }
        const markup = `<section class="cart">
                    <div class="container side_pad">
                        <table class="tb-cart">
                            <thead>
                                <tr>
                                    <th class="prod">Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${yield productCartRows(cartData)}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section class="discount_bill">
                    <div class="container">
                        <div class="shoping_discount">
                           
                        </div>
                        <div class="shoping_checkout">
                            <h5>Tổng thanh toán</h5>
                            <ul>
                                <li>Giảm giá <span>0 ₫</span></li>
                                <li>Thanh toán <span class="total_bill">$454.98</span></li>
                            </ul>
                            <a href="checkout.html" class="primary-btn">Thanh toán</a>
                        </div>
                    </div>
                </section>`;
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', markup);
        return true;
    });
}
function productCartRows(cartData) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = cartData.map((item) => __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield getData('products', item.id);
            return `<tr>
                <td class="cart_item">
                    <img src="${dataItem.images[0]}" alt="${dataItem.name}">
                    <h5>${dataItem.name}</h5>
                </td>
                <td class="cart_price" data-price="${dataItem.price}">
                    ${formatPrice(dataItem.price)}
                </td>
                <td class="cart_quantity">
                    <div class="quantity">
                        <div class="pro-qty">
                            <span data-dec=${item.id} class="dec qtybtn">-</span>
                            <input type="number" value="${item.quantity}" data-ip=${item.id}>
                            <span class="inc qtybtn" data-inc=${item.id}>+</span>
                        </div>
                    </div>
                </td>
                <td class="cart_total">
                    ${formatPrice(dataItem.price * item.quantity)}
                </td>
                <td class="cart_item_close">
                    <span class="icon_close"><i data-id=${item.id} class="fa fa-times" aria-hidden="true"></i></span>
                </td>
            </tr>`;
        }));
        const markup = yield Promise.all(promises);
        return markup.join('');
    });
}
