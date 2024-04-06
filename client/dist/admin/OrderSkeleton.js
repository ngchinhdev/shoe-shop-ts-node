var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData, updateDataJSON } from "../api/apiData.js";
import CRUD from "../utils/CRUD.js";
import { formatDate, formatPrice } from "../utils/helpers.js";
export default class OrderSkeleton extends CRUD {
    constructor() {
        super('blogs');
    }
    handleUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield getData('orders', id);
            const statusOrder = document.querySelector(`.change-status[data-id="${id}"]`);
            yield updateDataJSON('orders', id, Object.assign(Object.assign({}, order), { status: statusOrder.value }));
        });
    }
    handleAdd() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    handleDelete() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    handleDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield getData('orders', id);
            const markup = yield this.detailMarkupRow(order);
            this.clearAndInsertToContainer(markup);
        });
    }
    generateMainMarkup(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    mainMarkupRow(order, index) {
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
    detailMarkupRow(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Promise.all(order.items.map((item) => __awaiter(this, void 0, void 0, function* () {
                const product = yield getData('products', item.product);
                return Object.assign(Object.assign({}, product), { quantityOrder: item.quantity });
            })));
            const sumOrderPrice = products.reduce((prev, cur) => prev += cur.price * cur.quantityOrder, 0);
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
                                            <img src="${product.images[0]}" alt="${product.name}">
                                        </td>
                                        <td>
                                            ${product.quantityOrder}
                                        </td>
                                        <td>
                                            ${formatPrice(product.price)}
                                        </td>
                                    </tr>`).join('')}
                </table>
                <p class="sum-order">Tổng tiền đơn hàng: <span>${formatPrice(sumOrderPrice)}</span></p>
                        <div> (*) Ghi chú: ${order.note}</div>`;
        });
    }
}
