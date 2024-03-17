import { deleteData, getData, updateDataJSON } from "../api/apiData.js";
import { IUser } from "../types/users.js";
import CRUD from "../utils/CRUD.js";

export default class UserSkeleton extends CRUD {
    role!: HTMLSelectElement;

    constructor() {
        super('users');
    }

    async generateMainMarkup(usersData: IUser[]) {
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
                                <th>Quyền</th>
                                <th>Thao tác</th>
                            </tr>
                            ${usersData.map((user, index) => this.mainMarkupRow(user, index)).join('')}
                        </table>`;

        this.clearAndInsertToContainer(markup);
    }

    mainMarkupRow(user: IUser, index: number) {

        return `<tr>
                    <td>
                        ${index + 1}
                    </td>
                    <td>
                        ${user.fullName}
                    </td>
                    <td>
                        ${user.phone}
                    </td>
                    <td>
                        ${user.email}
                    </td>
                    <td>
                        ${user.address}
                    </td>
                    <td>
                        <select name="role" id="role" class="change-role change-btn" data-id="${user._id}">
                            <option value="0" ${user.isAdmin ? '' : 'selected'}>User</option>
                            <option value="1" ${user.isAdmin ? 'selected' : ''}>Admin</option>
                        </select>
                    </td>
                    <td>
                        <div class="last-td">
                            <span data-id=${user._id} class="del-btn">Xóa</span>
                        </div>
                    </td>
                </tr>`;
    }

    async handleAdd(): Promise<void> {

    }

    async handleUpdate(id: string): Promise<void> {
        const user = await getData('users', id);

        this.role = document.querySelector(`.change-btn[data-id="${id}"]`) as HTMLSelectElement;

        const newRole = this.role.value;

        await updateDataJSON('users', id, { ...user, isAdmin: newRole === '1' ? true : false });
    }

    async handleDelete(id: string): Promise<void> {
        const isDelete = confirm("Bạn có chắc chắn muốn xóa?");

        if (!isDelete) return;

        await deleteData('users', id);
        await this.initialize('users');
    }

}