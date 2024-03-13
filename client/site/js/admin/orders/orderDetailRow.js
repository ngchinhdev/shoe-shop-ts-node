import { getOrdersInfo } from "../../api/apiOrders.js";
import { getProducts } from "../../api/apiProducts.js";
import { formatPrice } from "../../utils/formatPrice.js";
import { formatDate } from "../../utils/helper.js";
import { loader2 } from "../../utils/loader.js";

async function generateMarkup(orderProductData, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const sumOrderPay = orderProductData.reduce((prev, cur) => prev + +cur.quantityOrder * +cur.priceOrder, 0);

    const markup = `<div class="nav">
                <div class="above_table">
                    <div class="ctg_name">
                        <strong>Chi tiết đơn hàng</strong>
                    </div>
                </div>
                <div class="add-new">
                    Đơn hàng ngày: ${formatDate(orderProductData[0].orderAt)}
                </div>
            </div>
            <table>
                <tr>
                    <th>#</th>
                    <th>Sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Số lượng</th>
                    <th>Giá tiền</th>
                </tr>
                ${orderProductData.map((product, index) => markupRow(product, index)).join('')}
            </table>
            <p class="sum-order">Tổng tiền đơn hàng: <span>${formatPrice(sumOrderPay)}</span></p>
            <div> (*) Ghi chú: ${orderProductData[0].note}</div>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

function markupRow(product, index) {
    return `<tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${product.name}
                </td>
                <td>
                    <img src="images/products/${product.images[0]}" alt="${product.name}">
                </td>
                <td>
                    ${product.quantityOrder}
                </td>
                <td>
                    ${formatPrice(product.priceOrder)}
                </td>
            </tr>`;
}

export default async function initOrderDetail(idOrder, container) {
    const orderInfo = await getOrdersInfo(idOrder);

    const promises = orderInfo.products.map(async (prod) => {
        return await getProducts(prod.id);
    });

    const productsOrder = await Promise.all(promises);

    const orderProductData = productsOrder.map((product, index) => ({
        ...product,
        quantityOrder: orderInfo.products[index].quantity,
        priceOrder: orderInfo.products[index].price,
        orderAt: orderInfo.orderAt,
        note: orderInfo.note
    }));

    await generateMarkup(orderProductData, container);
}