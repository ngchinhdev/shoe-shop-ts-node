import { getOrdersInfo } from "../../api/apiOrders.js";
import { loader2 } from "../../utils/loader.js";
import handlePagination, { generatePagination } from "../common/pagination.js";
import initOrderDetail from "./orderDetailRow.js";
import handleUpdateOrder from "./orderUpdate.js";

const PER_PAGE = 10;

async function generateMarkup(ordersData, startIdx, container) {
    container.innerHTML = '';
    await loader2(container, 500);

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
                ${ordersData.map((order, index) => markupRow(order, index, startIdx)).join('')}
            </table>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

function markupRow(order, index, startIdx) {
    return `<tr>
                <td>
                    ${startIdx + index + 1}
                </td>
                <td>
                    ${order.customerName}
                </td>
                <td>
                    ${order.phoneNumber}
                </td>
                <td>
                    ${order.email}
                </td>
                <td>
                    ${order.address}, ${order.province}
                </td>
                <td>
                    ${order.paymentMethod == 0 ? 'Chuyển khoản' : 'Tiền mặt'}
                </td>
                <td>
                    <select name="status" id="status" class="change-status" data-id="${order.id}">
                        <option ${order.status == 0 ? 'selected' : ''} value="0">Đang giao</option>
                        <option ${order.status == 1 ? 'selected' : ''} value="1">Đã giao</option>
                    </select>
                </td>
                <td>
                    <div class="last-td">
                        <span data-id=${order.id} class="detail-btn">Chi tiết</span>
                    </div>
                </td>
            </tr>`;
}

export default async function initOrders(container, curPage = 0) {
    const ordersData = await getOrdersInfo();

    const totalPages = Math.ceil(ordersData.length / PER_PAGE);

    const startIdx = curPage * PER_PAGE;
    const endIdx = startIdx + PER_PAGE;

    await generateMarkup(ordersData.slice(startIdx, endIdx), startIdx, container);
    generatePagination(totalPages, curPage, container);

    const table = document.querySelector('table');
    const pagination = document.querySelector('.pagination');

    table.addEventListener('click', async function (e) {
        const btn = e.target;

        if (btn.classList.contains('change-status')) {
            const idOrder = btn.dataset.id;

            const newStatus = btn.value;

            await handleUpdateOrder(idOrder, newStatus);
        }

        if (btn.classList.contains('detail-btn')) {
            const idOrder = btn.dataset.id;

            await initOrderDetail(idOrder, container);
        }
    });

    pagination.addEventListener('click', async function (e) {
        const btn = e.target;

        if (!btn.hasAttribute('data-page')) return;

        const pageNumber = +btn.dataset.page;

        await handlePagination(container, pageNumber, initOrders);
    });
}