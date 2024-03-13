import { getBlogs } from "../../api/apiBlogs.js";
import { getCategories } from "../../api/apiCategories.js";
import { getOrdersInfo } from "../../api/apiOrders.js";
import { getProducts } from "../../api/apiProducts.js";
import { getUser } from "../../api/apiUsers.js";
import { formatPrice } from "../../utils/formatPrice.js";
import { loader2 } from "../../utils/loader.js";

function calculateTotalAllOrders(orders) {
    return orders.reduce((total, order) => {
        return total + calculateOrderTotal(order);
    }, 0);
}

function calculateOrderTotal(order) {
    return order.products.reduce((total, product) => {
        return total + parseInt(product.price) * parseInt(product.quantity);
    }, 0);
}

async function generateMarkup(container, data) {
    container.innerHTML = '';
    await loader2(container, 500);

    const totalOrderPrice = calculateTotalAllOrders(data.totalOrders);
    const topSaleProducts = data.totalProducts.filter(prod => prod.purchased > 0).sort((a, b) => +b.purchased - +a.purchased).slice(0, 10);

    const markup = `<div id="dashboard">
                        <h1>Trang thống kê</h1>
                        <div class="four-col">
                            <div class="col col-1">
                                <div class="icon">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </div>
                                <div class="number">
                                    ${data.totalUsers}
                                </div>
                                <h3 class="title">
                                    Người dùng
                                </h3>
                                <div class="more-info link" data-control="user">
                                    Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="icon">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                </div>
                                <div class="number">
                                    ${data.totalBlogs}
                                </div>
                                <h3 class="title">
                                    Bài viết
                                </h3>
                                <div class="more-info link" data-control="category">
                                    Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col col-3">
                                <div class="icon">
                                    <i class="fa fa-lemon-o" aria-hidden="true"></i>
                                </div>
                                <div class="number">
                                    ${data.totalProducts.length}
                                </div>
                                <h3 class="title">
                                    Sản phẩm
                                </h3>
                                <div class="more-info link" data-control="product">
                                    Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col col-4">
                                <div class="icon">
                                    <i class="fa fa-money" aria-hidden="true"></i>
                                </div>
                                <div class="number">
                                    ${formatPrice(totalOrderPrice)}
                                </div>
                                <h3 class="title">
                                    Tổng doanh thu
                                </h3>
                                <div class="more-info link" data-control="order">
                                    Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div class="two-col">
                            <div class="col col-first">
                                <div class="col col-3">
                                    <div class="icon">
                                        <i class="fa fa-tags" aria-hidden="true"></i>
                                    </div>
                                    <div class="number">
                                        ${data.totalCategories}
                                    </div>
                                    <h3 class="title">
                                        Danh mục
                                    </h3>
                                    <div class="more-info link" data-control="product">
                                        Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="col col-4">
                                    <div class="icon">
                                        <i class="fa fa-file-text" aria-hidden="true"></i>
                                    </div>
                                    <div class="number">
                                        ${data.totalOrders.length}
                                    </div>
                                    <h3 class="title">
                                        Đơn mua
                                    </h3>
                                    <div class="more-info link" data-control="order">
                                        Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col best-inventory">
                                <div class="title">
                                    <h3>TOP Sản phẩm bán chạy</h3>
                                </div>
                                <div class="content">
                                    <table>
                                        <tr>
                                            <th>#</th>
                                            <th>Sản phẩm</th>
                                            <th>Lượt mua</th>
                                        </tr>
                                        ${topSaleProducts.map((prod, index) => `<tr>
                                                                            <td>${index + 1}</td>
                                                                            <td>${prod.name}</td>
                                                                            <td>${prod.purchased}</td>
                                                                        </tr>`).join('')}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function initDashboard(container) {
    const data = {};

    const totalProducts = await getProducts();
    const totalBlogs = await getBlogs();
    const totalUsers = await getUser();
    const totalOrders = await getOrdersInfo();
    const totalCategories = await getCategories();

    data['totalProducts'] = totalProducts;
    data['totalBlogs'] = totalBlogs.length;
    data['totalUsers'] = totalUsers.length;
    data['totalOrders'] = totalOrders;
    data['totalCategories'] = totalCategories.length;

    await generateMarkup(container, data);
}