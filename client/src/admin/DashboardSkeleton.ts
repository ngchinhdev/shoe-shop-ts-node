import Chart from '../../node_modules/chart.js/auto/auto.mjs';
import { type IProduct } from '../types/products.js';
import { type ICategory } from '../types/categories.js';

import { formatPrice } from "../utils/helpers.js";
import { loaderCircle } from "../utils/loaders.js";
import { getData, getFullData } from '../api/apiData.js';
import { IOrder } from '../types/orders.js';

const randomColorBar = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
};

const countOccurrences = (categories: ICategory[], products: IProduct[]) => {
    const countMap: { [key: string]: number; } = {};

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
    container!: HTMLDivElement;
    ctxBar!: HTMLCanvasElement;
    ctxPie!: HTMLCanvasElement;

    countUser!: number;
    countProducts!: number;
    countBlogs!: number;
    sumPriceOrders!: number;

    productsData!: IProduct[];
    categoriesData!: ICategory[];
    chartBarData!: { [key: string]: number; };

    constructor() {
        this.initialize();
    }

    async initialize() {
        this.container = document.querySelector('main') as HTMLDivElement;

        await this.loader();
        await this.fetchData();
        this.renderDashboardMarkup();
        this.createChartBar();
        this.createChartPie();
    }

    async fetchData() {
        const products = await getFullData('products');
        const users = await getFullData('users');
        const categories = await getFullData('categories');
        const blogs = await getFullData('blogs');
        const orders: IOrder[] = await getFullData('orders');
        if (!orders.length) {
            this.sumPriceOrders = 0;
        } else {
            const promises = orders.map(async (order) => {
                const products = await Promise.all(order.items.map(async (item) => {
                    const product = await getData('products', item.product);
                    return product;
                }));
                return products;
            });

            const productsPromise = await Promise.all(promises);

            this.sumPriceOrders = productsPromise.flat().reduce((acc, cur) => acc + cur.price, 0);
        }

        this.countProducts = products.length;
        this.countUser = users.length;
        this.categoriesData = categories;
        this.countBlogs = blogs.length;

        this.chartBarData = countOccurrences(categories, products);
    }

    async loader() {
        this.container.innerHTML = '';
        await loaderCircle(this.container, 500);
    }

    createChartBar() {
        this.ctxBar = document.getElementById('myChartBar') as HTMLCanvasElement;

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
        this.ctxPie = document.getElementById('myChartPie') as HTMLCanvasElement;

        new Chart(this.ctxPie, {
            type: 'pie',
            data: {
                labels: [
                    'Adidas',
                    'MLB',
                    'Nike',
                    'Converse'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [270, 50, 100, 150],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)'
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
                                        ${this.countBlogs}
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
                                         ${formatPrice(this.sumPriceOrders)}
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