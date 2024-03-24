var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CRUD from "../utils/CRUD.js";
export default class OrderSkeleton extends CRUD {
    constructor() {
        super('blogs');
    }
    handleUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    handleAdd() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    handleDelete() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    generateMainMarkup() {
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
                            ${this.mainMarkupRow()}
                        </table>`;
            this.clearAndInsertToContainer(markup);
        });
    }
    mainMarkupRow() {
        return `<tr>
                    <td>
                        1
                    </td>
                    <td>
                        Nguyen Chinh
                    </td>
                    <td>
                        0987678567
                    </td>
                    <td>
                        chinhchinh@gmail.com
                    </td>
                    <td>
                        Go Vap, HCM
                    </td>
                    <td>
                        Chuyển khoản
                    </td>
                    <td>
                        <select name="status" id="status" class="change-status" data-id="">
                            <option value="0">Đang giao</option>
                            <option value="1">Đã giao</option>
                        </select>
                    </td>
                    <td>
                        <div class="last-td">
                            <span data-id="" class="detail-btn">Chi tiết</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        2
                    </td>
                    <td>
                        Nguyen Nam
                    </td>
                    <td>
                        0334576345
                    </td>
                    <td>
                        namnu@gmail.com
                    </td>
                    <td>
                        Bac Kan
                    </td>
                    <td>
                        Tien mat
                    </td>
                    <td>
                        <select name="status" id="status" class="change-status" data-id="">
                            <option value="0">Đang giao</option>
                            <option value="1">Đã giao</option>
                        </select>
                    </td>
                    <td>
                        <div class="last-td">
                            <span data-id="" class="detail-btn">Chi tiết</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        3
                    </td>
                    <td>
                        Bao Tran
                    </td>
                    <td>
                        065234321
                    </td>
                    <td>
                        baotran@gmail.com
                    </td>
                    <td>
                        Binh Duong
                    </td>
                    <td>
                        Chuyển khoản
                    </td>
                    <td>
                        <select name="status" id="status" class="change-status" data-id="">
                            <option value="0">Đang giao</option>
                            <option value="1">Đã giao</option>
                        </select>
                    </td>
                    <td>
                        <div class="last-td">
                            <span data-id="" class="detail-btn">Chi tiết</span>
                        </div>
                    </td>
                </tr>`;
    }
}
