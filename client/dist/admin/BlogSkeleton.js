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
export default class BlogSkeleton extends CRUD {
    constructor() {
        super('blogs');
    }
    handleAdd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loader();
            yield this.generateAddMarkup();
            this.formAddAndEdit = document.querySelector('form');
            this.formAddAndEdit.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const form = new FormData(this.formAddAndEdit);
                const title = form.get('title');
                const content = form.get('content');
                const category = form.get('category');
                const thumbnail = form.get('thumbnail');
                console.log(title, content, category, thumbnail.name);
                if (!title || !content || !category || !thumbnail.name) {
                    alert('Vui lòng nhập đầy đủ các trường!');
                    return;
                }
                const isAdd = confirm('Xác nhận thêm bài viết?');
                if (!isAdd)
                    return;
                yield postData('blogs', form);
                yield this.initialize('blogs');
            }));
        });
    }
    handleUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loader();
            const dataOld = yield getData('blogs', id);
            this.generateUpdateMarkup(dataOld);
            this.formAddAndEdit = document.querySelector('form');
            this.formAddAndEdit.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const form = new FormData(this.formAddAndEdit);
                const title = form.get('title');
                const content = form.get('content');
                const category = form.get('category');
                if (!title || !content || !category) {
                    alert('Vui lòng nhập đầy đủ các trường!');
                    return;
                }
                const isUpdate = confirm('Xác nhận cập nhật bài viết?');
                if (!isUpdate)
                    return;
                yield updateDataForm('blogs', id, form);
                yield this.initialize('blogs');
            }));
        });
    }
    handleDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDelete = confirm("Bạn có chắc chắn muốn xóa?");
            if (!isDelete)
                return;
            yield deleteData('blogs', id);
            yield this.initialize('blogs');
        });
    }
    generateMainMarkup(blogsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const markup = `<div class="nav">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Bài viết</strong>
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
                                <th>Hình ảnh</th>
                                <th>Nội dung</th>
                                <th>Thao tác</th>
                            </tr>
                            ${blogsData === null || blogsData === void 0 ? void 0 : blogsData.map((blog, index) => this.mainMarkupRow(blog, index)).join('')}
                        </table>`;
            this.clearAndInsertToContainer(markup);
        });
    }
    mainMarkupRow(blog, index) {
        return `<tr>
                    <td>
                        ${index + 1}
                    </td>
                    <td class="tt-blog">
                        ${blog.title}
                    </td>
                    <td>
                        <img src="${blog.thumbnail}" class="ctn" alt="${blog.title}">
                    </td>
                    <td class="ctn-blog">
                        <p>${blog.content}</p>
                    </td>
                    <td>
                        <div class="last-td">
                            <span data-id=${blog._id} class="change-btn">Sửa</span>
                            <span data-id=${blog._id} class="del-btn">Xóa</span>
                        </div>
                    </td>
                </tr>`;
    }
    generateAddMarkup() {
        return __awaiter(this, void 0, void 0, function* () {
            const markup = `<form class="sub_main" action="" method="post">
                            <div class="nav">
                                <div class="above_table">
                                    <div class="ctg_name">
                                        <strong>Thêm bài viết</strong>
                                    </div>
                                </div>
                                <div class="add-new">
                                </div>
                            </div>
                            <div class="add_prod add_common">
                                <div class="field">
                                    <label for="title">Tiêu đề</label>
                                    <input type="text" id="title" name="title" class="w-100 cm">
                                </div>
                                <div class="field">
                                    <label for="price">Nội dung</label>
                                    <textarea name="content" id="contents" rows="10"></textarea>
                                </div>
                                <div class="field">
                                    <label for="category">Danh mục</label>
                                    <input name="category" id="category" class="w-100 cm">
                                </div>
                                <div class="field">
                                    <label for="thumbnail">Hình ảnh</label>
                                    <input type="file" id="thumbnail" name="thumbnail">
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
            const markup = `<form class="sub_main" action="" method="post">
                            <div class="nav">
                                <div class="above_table">
                                    <div class="ctg_name">
                                        <strong>Chỉnh sửa bài viết</strong>
                                    </div>
                                </div>
                                <div class="add-new">
                                </div>
                            </div>
                            <div class="add_prod add_common">
                                <input type="hidden" name="oldThumbnail" value="${dataOld.thumbnail}">
                                <div class="field">
                                    <label for="title">Tiêu đề</label>
                                    <input type="text" id="title" value="${dataOld.title}" name="title" class="w-100 cm">
                                </div>
                                <div class="field">
                                    <label for="price">Nội dung</label>
                                    <textarea name="content" id="contents" rows="10">${dataOld.content}</textarea>
                                </div>
                                <div class="field">
                                    <label for="category">Danh mục</label>
                                    <input name="category" id="category" class="w-100 cm" value="${dataOld.category}">
                                </div >
                                <div class="field">
                                    <label for="thumbnail">Hình ảnh</label>
                                    <input type="file" id="thumbnail" name="thumbnail">
                                </div>
                            </div >
                                <div>
                                    <button class="btn-add">Cập nhật</button>
                                </div>
                        </form > `;
            this.clearAndInsertToContainer(markup);
        });
    }
}
