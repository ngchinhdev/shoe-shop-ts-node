var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Chart from '../../node_modules/chart.js/auto/auto.mjs';
import { formatPrice } from "../utils/formatPrice.js";
import { loaderCircle } from "../utils/loaders.js";
import { getFullData } from '../api/apiData.js';
const randomColorBar = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
};
const countOccurrences = (categories, products) => {
    const countMap = {};
    for (const category of categories) {
        let count = 0;
        for (const product of products) {
            if (product.categoryId === category._id) {
                count++;
            }
        }
        if (category.name)
            countMap[category.name] = count;
    }
    return countMap;
};
const arr = Array.from({ length: 7 });
export default class DashboardSkeleton {
    constructor() {
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.container = document.querySelector('main');
            yield this.loader();
            yield this.fetchData();
            this.renderDashboardMarkup();
            this.createChartBar();
            this.createChartPie();
        });
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield getFullData('products');
            const users = yield getFullData('users');
            const categories = yield getFullData('categories');
            this.countProducts = products.length;
            this.countUser = users.length;
            this.categoriesData = categories;
            this.chartBarData = countOccurrences(categories, products);
        });
    }
    loader() {
        return __awaiter(this, void 0, void 0, function* () {
            this.container.innerHTML = '';
            yield loaderCircle(this.container, 500);
        });
    }
    createChartBar() {
        this.ctxBar = document.getElementById('myChartBar');
        new Chart(this.ctxBar, {
            type: 'bar',
            data: {
                labels: Object.keys(this.chartBarData).map((key) => key),
                datasets: [{
                        label: 'Danh mục sản phẩm',
                        data: Object.values(this.chartBarData).map((value) => value),
                        backgroundColor: arr.map(() => randomColorBar()),
                    }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 18
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            },
        });
    }
    createChartPie() {
        this.ctxPie = document.getElementById('myChartPie');
        new Chart(this.ctxPie, {
            type: 'pie',
            data: {
                labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                ],
                datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                    }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 18
                            }
                        }
                    }
                }
            },
        });
    }
    renderDashboardMarkup() {
        const markup = `<div id="dashboard">
                            <h1>Trang thống kê</h1>
                            <div class="four-col">
                                <div class="col col-1">
                                    <div class="icon">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                    <div class="number">
                                        ${this.countUser}
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
                                        0
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
                                        ${this.countProducts}
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
                                         ${formatPrice(0)}
                                    </div>
                                    <h3 class="title">
                                        Tổng doanh thu
                                    </h3>
                                    <div class="more-info link" data-control="order">
                                        Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="chart-wrap">
                                <div class="chartBar"><canvas id="myChartBar"></canvas></div>
                                <div class="chartPie"><canvas id="myChartPie"></canvas></div>
                            </div>
                        </div>`;
        this.container.innerHTML = '';
        this.container.insertAdjacentHTML('beforeend', markup);
    }
}
