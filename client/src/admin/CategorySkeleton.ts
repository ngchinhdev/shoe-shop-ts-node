import CRUD from "../utils/CRUD.js";

import { deleteData, getData, postData, updateDataForm } from "../api/apiData.js";

import { type ICategory } from "../types/categories.js";

export default class CategorySkeleton extends CRUD {
    formAddAndEdit!: HTMLFormElement;

    constructor() {
        super('categories');
    }

    async handleAdd() {
        await this.loader();

        await this.generateAddMarkup();

        this.formAddAndEdit = document.querySelector('form') as HTMLFormElement;

        this.formAddAndEdit.addEventListener('submit', async (e) => {
            e.preventDefault();

            const form = new FormData(this.formAddAndEdit);

            const name = form.get('name');
            const image = form.get('image') as File;

            if (!name || !image.name) {
                alert('Vui lòng nhập đầy đủ các trường!');
                return;
            }

            const isAdd = confirm('Xác nhận thêm danh mục?');

            if (!isAdd) return;

            await postData('categories', form);
            await this.initialize('categories');
        });
    }

    async handleUpdate(id: string) {
        await this.loader();
        const dataOld = await getData('categories', id);
        this.generateUpdateMarkup(dataOld);

        this.formAddAndEdit = document.querySelector('form') as HTMLFormElement;

        this.formAddAndEdit.addEventListener('submit', async (e) => {
            e.preventDefault();

            const form = new FormData(this.formAddAndEdit);

            const name = form.get('name');

            if (!name) {
                alert('Vui lòng nhập đầy đủ các trường!');
                return;
            }

            const isAdd = confirm('Xác nhận cập nhật danh mục?');

            if (!isAdd) return;

            await updateDataForm('categories', id, form);
            await this.initialize('categories');
        });
    }

    async handleDelete(id: string) {
        const isDelete = confirm("Bạn có chắc chắn muốn xóa?");

        if (!isDelete) return;

        await deleteData('categories', id);
        await this.initialize('categories');
    }

    async generateMainMarkup(categoriesData: ICategory[]) {
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
                            ${categoriesData?.map((cate, index) => this.mainMarkupRow(cate, index)).join('')}
                        </table>`;

        this.clearAndInsertToContainer(markup);
    }

    mainMarkupRow(cate: ICategory, index: number) {

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

    async generateAddMarkup() {
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
    }

    async generateUpdateMarkup(dataOld: ICategory) {
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
    }
}