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
import { deleteData, getData, postData, updateDataForm } from "../api/apiData.js";
export default class CategorySkeleton extends CRUD {
    constructor() {
        super('categories');
    }
    handleAdd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loader();
            yield this.generateAddMarkup();
            this.formAddAndEdit = document.querySelector('form');
            this.formAddAndEdit.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const form = new FormData(this.formAddAndEdit);
                const name = form.get('name');
                const image = form.get('image');
                if (!name || !image.name) {
                    alert('Vui lòng nhập đầy đủ các trường!');
                    return;
                }
                const isAdd = confirm('Xác nhận thêm danh mục?');
                if (!isAdd)
                    return;
                yield postData('categories', form);
                yield this.initialize('categories');
            }));
        });
    }
    handleUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loader();
            const dataOld = yield getData('categories', id);
            this.generateUpdateMarkup(dataOld);
            this.formAddAndEdit = document.querySelector('form');
            this.formAddAndEdit.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const form = new FormData(this.formAddAndEdit);
                const name = form.get('name');
                if (!name) {
                    alert('Vui lòng nhập đầy đủ các trường!');
                    return;
                }
                const isAdd = confirm('Xác nhận cập nhật danh mục?');
                if (!isAdd)
                    return;
                yield updateDataForm('categories', id, form);
                yield this.initialize('categories');
            }));
        });
    }
    handleDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDelete = confirm("Bạn có chắc chắn muốn xóa?");
            if (!isDelete)
                return;
            yield deleteData('categories', id);
            yield this.initialize('categories');
        });
    }
    generateMainMarkup(categoriesData) {
        return __awaiter(this, void 0, void 0, function* () {
            const markup = `<div class="nav" style="width: 65% !important;">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Danh mục</strong>
                                </div>
                            </div>
                            <div class="add-new">
                                <span >+ Thêm mới</span>
                            </div>
                        </div>
                        <table style="width: 65% !important; margin-left: 0">
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th>Hình ảnh</th>
                                <th>Thao tác</th>
                            </tr>
                            ${categoriesData === null || categoriesData === void 0 ? void 0 : categoriesData.map((cate, index) => this.mainMarkupRow(cate, index)).join('')}
                        </table>`;
            this.clearAndInsertToContainer(markup);
        });
    }
    mainMarkupRow(cate, index) {
        return `<tr>
                    <td>
                        ${index + 1}
                    </td>
                    <td>
                        ${cate.name}
                    </td>
                    <td>
                        <img src="${cate.image}" alt="${cate.name}">
                    </td>
                    <td>
                        <div class="last-td">
                            <span data-id=${cate._id} class="change-btn">Sửa</span>
                            <span data-id=${cate._id} class="del-btn">Xóa</span>
                        </div>
                    </td>
                </tr>`;
    }
    generateAddMarkup() {
        return __awaiter(this, void 0, void 0, function* () {
            const markup = `<form class="sub_main ib" action="" method="post">
                            <div class="nav">
                                <div class="above_table">
                                    <div class="ctg_name">
                                        <strong>Thêm danh mục</strong>
                                    </div>
                                </div>
                                <div class="add-new">
                                </div>
                            </div>
                            <div class="add_cate add_common">
                                <div class="field">
                                    <label for="name">Tên danh mục</label>
                                    <input type="text" id="name" class="cm" name="name">
                                </div>
                                <div class="field">
                                    <label for="image">Hình ảnh</label>
                                    <input type="file" id="image" name="image">
                                </div>
                            </div>
                            <div>
                                <button class="btn-add">Thêm</button>
                            </div>
                        </form>`;
            this.clearAndInsertToContainer(markup);
        });
    }
    generateUpdateMarkup(dataOld) {
        return __awaiter(this, void 0, void 0, function* () {
            const markup = `<form class="sub_main" action="" method="patch">
                            <div class="nav">
                                <div class="above_table">
                                    <div class="ctg_name">
                                        <strong>Cập nhật danh mục</strong>
                                    </div>
                                </div>
                                <div class="add-new">
                                </div>
                            </div>
                            <div class="add_cate add_common">
                                <input type="hidden" name="oldImage" value='${dataOld.image}'>
                                <div class="field">
                                    <label for="name">Tên danh mục</label>
                                    <input type="text" id="name" class="cm" name="name" value="${dataOld.name}">
                                </div>
                                <div class="field" style="display: flex; align-items: center">
                                    <label for="image">Hình ảnh</label>
                                    <input type="file" id="image" name="image">
                                    <div class="img-preview">
                                        <img src="${dataOld.image}" alt="${dataOld.name}">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button class="btn-add">Cập nhật</button>
                            </div>
                        </form>`;
            this.clearAndInsertToContainer(markup);
        });
    }
}
