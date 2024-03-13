import { getRole } from "../../api/apiRoles.js";
import { loader2 } from "../../utils/loader.js";
import handlePagination, { generatePagination } from "../common/pagination.js";
import handleAddRole from "./roleAdd.js";
import handleDeleteRole from "./roleDelete.js";
import handleUpdateRole from "./roleUpdate.js";

const PER_PAGE = 10;

async function generateMarkup(rolesData, startIdx, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const markup = `<div class="nav">
                <div class="above_table">
                    <div class="ctg_name">
                        <strong>Vai trò</strong>
                    </div>
                </div>
                <div class="add-new">
                    <span >+ Thêm mới</span>
                </div>
            </div>
            <table >
                <tr>
                    <th>#</th>
                    <th>Tên danh mục</th>
                    <th>Thao tác</th>
                </tr>
                ${rolesData.map((role, index) => markupRow(role, index, startIdx)).join('')}
            </table>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

function markupRow(role, index, startIdx) {
    return `<tr>
                <td>
                    ${startIdx + index + 1}
                </td>
                <td>
                    ${role.name}
                </td>
                <td>
                    <div class="last-td">
                        <span data-id=${role.id} class="change-btn">Sửa</span>
                        <span data-id=${role.id} class="del-btn">Xóa</span>
                    </div>
                </td>
            </tr>`;
}

export default async function initRoles(container, curPage = 0) {
    const rolesData = await getRole();

    const totalPages = Math.ceil(rolesData.length / PER_PAGE);

    const startIdx = curPage * PER_PAGE;
    const endIdx = startIdx + PER_PAGE;

    await generateMarkup(rolesData.slice(startIdx, endIdx), startIdx, container);
    generatePagination(totalPages, curPage, container);

    const addNewBtn = document.querySelector('.add-new span');
    const table = document.querySelector('table');
    const pagination = document.querySelector('.pagination');

    addNewBtn.addEventListener('click', async function () {
        await handleAddRole(container);
    });

    table.addEventListener('click', async function (e) {
        const btn = e.target;

        if (btn.classList.contains('del-btn')) {
            const idRole = btn.dataset.id;

            await handleDeleteRole(idRole, container);
        }

        if (btn.classList.contains('change-btn')) {
            const idRole = btn.dataset.id;

            await handleUpdateRole(idRole, container);
        }
    });

    pagination.addEventListener('click', async function (e) {
        const btn = e.target;

        if (!btn.hasAttribute('data-page')) return;

        const pageNumber = +btn.dataset.page;

        await handlePagination(container, pageNumber, initRoles);
    });
}