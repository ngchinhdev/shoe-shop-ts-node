import { getRole } from "../../api/apiRoles.js";
import { getUser } from "../../api/apiUsers.js";
import { loader2 } from "../../utils/loader.js";
import handlePagination, { generatePagination } from "../common/pagination.js";
import handleDeleteUser from "./userDelete.js";
import handleUpdateRole from "./userUpdate.js";

const PER_PAGE = 10;

async function generateMarkup(usersData, startIdx, container, roles) {
    container.innerHTML = '';
    await loader2(container, 500);

    const markup = `<div class="nav">
                        <div class="above_table">
                            <div class="ctg_name">
                                <strong>Người dùng</strong>
                            </div>
                        </div>
                        <div class="add-new">
                            
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Vai trò</th>
                            <th>Thao tác</th>
                        </tr>
                        ${usersData.map((user, index) => markupRow(user, index, startIdx, roles)).join('')}
                    </table>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

function markupRow(user, index, startIdx, roles) {
    return `<tr>
                <td>
                    ${index + 1 + startIdx}
                </td>
                <td>
                    ${user.name}
                </td>
                <td>
                    ${user.phoneNumber}
                </td>
                <td>
                    ${user.email}
                </td>
                <td>
                    ${user.address}
                </td>
                <td>
                    <select name="role" id="role" class="change-role" data-id="${user.id}">
                        ${roles.map((role) => `<option ${role.id == user.role ? 'selected' : ''} value=${role.id}>${role.name}</option>`).join('')}
                    </select>
                </td>
                <td>
                    <div class="last-td">
                        <span data-id=${user.id} class="del-btn">Xóa</span>
                    </div>
                </td>
            </tr>`;
}

export default async function initUsers(container, curPage = 0) {
    const usersData = await getUser();
    const roles = await getRole();

    const totalPages = Math.ceil(usersData.length / PER_PAGE);

    const startIdx = curPage * PER_PAGE;
    const endIdx = startIdx + PER_PAGE;

    await generateMarkup(usersData.slice(startIdx, endIdx), startIdx, container, roles);
    generatePagination(totalPages, curPage, container);

    const table = document.querySelector('table');
    const pagination = document.querySelector('.pagination');

    table.addEventListener('click', async function (e) {
        const btn = e.target;

        if (btn.classList.contains('del-btn')) {
            const idUser = btn.dataset.id;

            await handleDeleteUser(idUser, container);
        }

        if (btn.classList.contains('change-role')) {
            const idUser = btn.dataset.id;
            await handleUpdateRole(idUser, btn.value, container);
        }
    });

    pagination.addEventListener('click', async function (e) {
        const btn = e.target;

        if (!btn.hasAttribute('data-page')) return;

        const pageNumber = +btn.dataset.page;

        await handlePagination(container, pageNumber, initUsers);
    });
}