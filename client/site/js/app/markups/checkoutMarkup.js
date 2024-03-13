import { formatPrice } from "../../utils/formatPrice.js";

export async function generateProductToPay(products, container) {
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
}

function productToPayMarkup(product) {
    return `<tr>
                <td class="">
                    <div class="img-prod">
                        <img src="./images/products/${product.images[0]}" alt="${product.name}">
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