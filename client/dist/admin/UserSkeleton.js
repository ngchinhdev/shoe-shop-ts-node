var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteData, getData, updateDataJSON } from "../api/apiData.js";
import CRUD from "../utils/CRUD.js";
export default class UserSkeleton extends CRUD {
    constructor() {
        super('users');
    }
    generateMainMarkup(usersData) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    mainMarkupRow(user, index) {
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
    handleAdd() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    handleUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield getData('users', id);
            this.role = document.querySelector(`.change-btn[data-id="${id}"]`);
            const newRole = this.role.value;
            yield updateDataJSON('users', id, Object.assign(Object.assign({}, user), { isAdmin: newRole === '1' ? true : false }));
        });
    }
    handleDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDelete = confirm("Bạn có chắc chắn muốn xóa?");
            if (!isDelete)
                return;
            yield deleteData('users', id);
            yield this.initialize('users');
        });
    }
}
