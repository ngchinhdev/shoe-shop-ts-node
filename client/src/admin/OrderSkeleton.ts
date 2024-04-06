import { getData, updateDataJSON } from "../api/apiData.js";
import { IOrder } from "../types/orders.js";
import { IProduct } from "../types/products.js";
import CRUD from "../utils/CRUD.js";
import { formatDate, formatPrice } from "../utils/helpers.js";

export default class OrderSkeleton extends CRUD {
    formAddAndEdit!: HTMLFormElement;

    constructor() {
        super('blogs');
    }

    async handleUpdate(id: string) {
        const order = await getData('orders', id);

        const statusOrder = document.querySelector(`.change-status[data-id="${id}"]`) as HTMLSelectElement;

        await updateDataJSON('orders', id, { ...order, status: statusOrder.value });
    }

    async handleAdd() { }

    async handleDelete() { }

    async handleDetail(id: string) {
        const order = await getData('orders', id);

        const markup = await this.detailMarkupRow(order);

        this.clearAndInsertToContainer(markup);
    }

    async generateMainMarkup(orderData: IOrder[]) {
        const markup = `<div class="nav">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Đơn hàng</strong>
                                </div>
                            </div>
                            <div class="add-new">
                                
                            </div>
                        </div>
                        <table>
                            <tr>
                                <th>#</th>
                                <th>Khách hàng</th>
                                <th>SDT</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                            ${orderData.map((order, index) => this.mainMarkupRow(order, index)).join('')}
                        </table>`;

        this.clearAndInsertToContainer(markup);
    }

    mainMarkupRow(order: IOrder, index: number) {
        return `<tr>
                    <td>
                        ${index + 1}
                    </td>
                    <td>
                        ${order.customerName}
                    </td>
                    <td>
                        ${order.customerPhone}
                    </td>
                    <td>
                        ${order.customerEmail}
                    </td>
                    <td>
                        ${order.customerAddress}
                    </td>
                    <td>
                        ${order.paymentMethod === 'cod' ? 'COD' : 'Banking'}
                    </td>
                    <td>
                        <select name="status" id="status" class="change-status change-btn" data-id="${order._id}">
                            <option ${order.status === 'pending' ? 'selected' : ''} value="pending">Đang giao</option>
                            <option ${order.status === 'cancelled' ? 'selected' : ''} value="cancelled">Đã hủy</option>
                            <option ${order.status === 'completed' ? 'selected' : ''} value="completed">Đã giao</option>
                        </select>
                    </td>
                    <td>
                        <div class="last-td">
                            <span data-id="${order._id}" class="detail-btn">Chi tiết</span>
                        </div>
                    </td>
                </tr>
                `;
    }

    async detailMarkupRow(order: IOrder) {
        const products = await Promise.all(order.items.map(async item => {
            const product: IProduct & { quantityOrder: number; } = await getData('products', item.product);
            return { ...product, quantityOrder: item.quantity };
        }));

        const sumOrderPrice = products.reduce((prev, cur) => prev += cur.price! * cur.quantityOrder, 0);

        return `<div class="nav">
                    <div class="above_table">
                        <div class="ctg_name">
                            <strong>Chi tiết đơn hàng</strong>
                        </div>
                    </div>
                    <div class="add-new">
                        Đơn hàng ngày: ${formatDate(order.createdAt)}
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
                    ${products.map((product, index) => `<tr>
                                        <td>
                                            ${index + 1}
                                        </td>
                                        <td>
                                            ${product.name}
                                        </td>
                                        <td>
                                            <img src="${product.images![0]}" alt="${product.name}">
                                        </td>
                                        <td>
                                            ${product.quantityOrder}
                                        </td>
                                        <td>
                                            ${formatPrice(product.price!)}
                                        </td>
                                    </tr>`).join('')}
                </table>
                <p class="sum-order">Tổng tiền đơn hàng: <span>${formatPrice(sumOrderPrice)}</span></p>
                        <div> (*) Ghi chú: ${order.note}</div>`;
    }
}