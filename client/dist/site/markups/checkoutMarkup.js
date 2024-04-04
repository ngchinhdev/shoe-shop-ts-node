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
export function generateProductToPay(products, container) {
    return __awaiter(this, void 0, void 0, function* () {
        const sumPay = products.reduce((prev, cur) => prev += cur.price * +cur.quantityPay, 0);
        const markup = `<div class="sum s1">
                <strong>Tổng đơn hàng: </strong>
            </div>
            <table class="row_prod">
                ${products.map(product => productToPayMarkup(product)).join('')}
            </table>
            <div class="sum">
                <strong>Tổng tiền: </strong>
                <span>${formatPrice(sumPay)}</span>
            </div>`;
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', markup);
    });
}
function productToPayMarkup(product) {
    return `<tr>
                <td class="">
                    <div class="img-prod">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                </td>
                <td class="mid">
                    <div class="name-prod">
                        ${product.name}
                    </div>
                </td>
                <td class="">
                    <div class="quantity-prod">
                        x <span>${product.quantityPay}</span>
                    </div>
                </td>
                <td class="">
                    <div class="price-prod">
                        ${formatPrice(product.price)}
                    </div>
                </td>
            </tr>`;
}
