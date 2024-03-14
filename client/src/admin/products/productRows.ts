import { getFullData } from "../../api/apiData.js";
import { formatPrice } from "../../utils/formatPrice.js";
import { loaderCircle } from "../../utils/loader.js";
import { type IProduct } from "../../types/products.js";
// import handlePagination, { generatePagination } from "../common/pagination.js";
// import handleAddProduct from "./productAdd.js";
import handleDeleteProduct from "./productDelete.js";
// import handleUpdateProduct from "./productUpdate.js";

const PER_PAGE = 10;

async function generateMarkup(productsData: IProduct[], startIdx: number, container: HTMLDivElement) {
    container.innerHTML = '';
    await loaderCircle(container, 500);

    const markup = `<div class="nav">
                <div class="above_table">
                    <div class="ctg_name">
                        <strong>Sản phẩm</strong>
                    </div>
                </div>
                <div class="add-new">
                    <span >+ Thêm mới</span>
                </div>
            </div>
            <table>
                <tr>
                    <th>#</th>
                    <th>Tên sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Giá</th>
                    <th>Size/Số lượng</th>
                    <th>Hot</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
                </tr>
                ${productsData.map((product, index) => markupRow(product, index, startIdx)).join('')}
            </table>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

function markupRow(product: IProduct, index: number, startIdx: number) {
    return `<tr>
                <td>
                    ${startIdx + index + 1}
                </td>
                <td>
                    ${product.name}
                </td>
                <td>
                    ${product.images?.map(img => `<img src="${img}" alt="${product.name}">`).join('')}
                </td>
                <td>
                    ${product.price && formatPrice(product.price)}
                    <br />
                    <del>${product.orgPrice && formatPrice(product.orgPrice)}</del>
                </td>
                <td>
                    ${product.types?.map(type => `<p>${type.size}/${type.quantity} đôi</p>`).join('')}
                </td>
                <td>
                    ${product.hot ? 'Có' : 'Không'} 
                </td>
                <td class="prod-desc">
                    <p>${product.description}</p>
                </td>
                <td>
                    <div class="last-td">
                        <span data-id=${product._id} class="change-btn">Sửa</span>
                        <span data-id=${product._id} class="del-btn">Xóa</span>
                    </div>
                </td>
            </tr>`;
}

export default async function initProducts(container: HTMLDivElement, curPage = 0) {
    const productsData: IProduct[] = await getFullData('products');

    const totalPages = Math.ceil(productsData.length / PER_PAGE);

    const startIdx = curPage * PER_PAGE;
    const endIdx = startIdx + PER_PAGE;

    await generateMarkup(productsData.slice(startIdx, endIdx), startIdx, container);
    // generatePagination(totalPages, curPage, container);

    const addNewBtn = document.querySelector('.add-new span');
    const table = document.querySelector('table') as HTMLTableElement;
    const pagination = document.querySelector('.pagination');

    // addNewBtn.addEventListener('click', async function () {
    //     await handleAddProduct(container);
    // });

    table.addEventListener('click', async function (e) {
        const btn = e.target as HTMLSpanElement;

        if (btn.classList.contains('del-btn')) {
            const idProd = btn.dataset.id as string;

            await handleDeleteProduct(idProd, container);
        }

        // if (btn.classList.contains('change-btn')) {
        //     const idProd = btn.dataset.id;

        //     await handleUpdateProduct(idProd, container);
        // }
    });

    // pagination.addEventListener('click', async function (e) {
    //     const btn = e.target;

    //     if (!btn.hasAttribute('data-page')) return;

    //     const pageNumber = +btn.dataset.page;

    //     await handlePagination(container, pageNumber, initProducts);
    // });
}