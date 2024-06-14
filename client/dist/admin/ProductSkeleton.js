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
import { formatPrice } from "../utils/helpers.js";
import { deleteData, getData, getFullData, postData, updateDataForm } from "../api/apiData.js";
export default class ProductSkeleton extends CRUD {
    constructor() {
        super('products');
    }
    handleAdd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loader();
            const categories = yield getFullData('categories');
            yield this.generateAddMarkup(categories);
            this.formAddAndEdit = document.querySelector('form');
            this.formAddAndEdit.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const form = new FormData(this.formAddAndEdit);
                const name = form.get('name');
                const price = form.get('price');
                const orgPrice = form.get('orgPrice');
                const description = form.get('description');
                const hot = form.get('hot');
                const types = form.get('types');
                const color = form.get('color');
                const categoryId = form.get('categoryId');
                const images = form.getAll('images');
                if (!name || !description || !images[0].name || !price || !orgPrice || !hot || !color || !categoryId) {
                    alert('Vui lòng nhập đầy đủ các trường!');
                    return;
                }
                if (images.length > 4) {
                    alert('Số lượng hình ảnh tối đa là 4!');
                    return;
                }
                const isAdd = confirm('Xác nhận thêm sản phẩm?');
                if (!isAdd)
                    return;
                yield postData('products', form);
                yield this.initialize('products');
            }));
        });
    }
    handleUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loader();
            const dataOld = yield getData('products', id);
            const categories = yield getFullData('categories');
            this.generateUpdateMarkup(dataOld, categories);
            this.formAddAndEdit = document.querySelector('form');
            this.formAddAndEdit.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const form = new FormData(this.formAddAndEdit);
                const name = form.get('name');
                const price = form.get('price');
                const orgPrice = form.get('orgPrice');
                const description = form.get('description');
                const hot = form.get('hot');
                const types = form.get('types');
                const color = form.get('color');
                const categoryId = form.get('categoryId');
                const images = form.getAll('images');
                if (!name || !description || !price || !orgPrice || !hot || !color || !categoryId) {
                    alert('Vui lòng nhập đầy đủ các trường!');
                    return;
                }
                if (images.length > 4) {
                    alert('Số lượng hình ảnh tối đa là 4!');
                    return;
                }
                const isUpdate = confirm('Xác nhận cập nhật sản phẩm?');
                if (!isUpdate)
                    return;
                yield updateDataForm('products', id, form);
                yield this.initialize('products');
            }));
        });
    }
    handleDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDelete = confirm("Bạn có chắc chắn muốn xóa?");
            if (!isDelete)
                return;
            yield deleteData('products', id);
            yield this.initialize('products');
        });
    }
    generateMainMarkup(productsData) {
        return __awaiter(this, void 0, void 0, function* () {
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
                        <th>Hot</th>
                        <th>Mô tả</th>
                        <th>Thao tác</th>
                    </tr>
                    ${productsData.map((product, index) => this.mainMarkupRow(product, index)).join('')}
                </table>`;
            this.clearAndInsertToContainer(markup);
        });
    }
    mainMarkupRow(product, index) {
        var _a;
        const isSelling = product.price !== product.orgPrice;
        return `<tr>
                    <td>
                        ${index + 1}
                    </td>
                    <td>
                        ${product.name}
                        <br />
                        (${product.color})
                    </td>
                    <td>
                        ${(_a = product.images) === null || _a === void 0 ? void 0 : _a.slice(0, 2).map(img => `<img src="${img}" alt="${product.name}">`).join('')}
                    </td>
                    <td>
                        ${product.price && formatPrice(product.price)}
                        <br />
                        <del>${product.orgPrice && isSelling ? formatPrice(product.orgPrice) : ''}</del>
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
    generateAddMarkup(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            const markup = `<form class="sub_main" action="" method="post" enctype="multipart/form-data">
                            <div class="nav">
                                <div class="above_table">
                                    <div class="ctg_name">
                                        <strong>Thêm sản phẩm</strong>
                                    </div>
                                </div>
                                <div class="add-new">
                                </div>
                            </div>
                            <div class="add_prod add_common">
                                <div class="field">
                                    <label for="name">Tên sản phẩm</label>
                                    <input type="text" id="name" name="name" class="w-100 cm">
                                </div>
                                <div class="field">
                                    <label for="price">Giá hiện tại</label>
                                    <input type="number" id="price" name="price" class="w-100 cm">
                                </div>
                                <div class="field">
                                    <label for="orgPrice">Giá gốc</label>
                                    <input type="number" id="orgPrice" name="orgPrice" class="w-100 cm">
                                </div>
                                <div class="field">
                                    <label for="color">Màu sắc</label>
                                    <input type="string" id="color" name="color" class="w-100 cm">
                                </div>
                                <div class="field">
                                    <label for="hot">Trạng thái HOT</label>
                                    <select name="hot" id="hot">
                                        <option value="0">Không</option>
                                        <option value="1">Có</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <label for="category">Danh mục</label>
                                    <select name="categoryId" id="category">
                                        ${categories.map(cate => `<option value="${cate._id}">${cate.name}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="field">
                                    <label for="description">Mô tả sản phẩm</label>
                                    <textarea name="description" id="description" rows="10"></textarea>
                                </div>
                                <div class="field">
                                    <label for="images">Hình ảnh</label>
                                    <input type="file" id="images" name="images" multiple>
                                </div>
                            </div>
                            <div>
                                <button class="btn-add">Thêm</button>
                            </div>
                        </form>`;
            this.clearAndInsertToContainer(markup);
        });
    }
    generateUpdateMarkup(dataOld, categories) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const convertTypes = (_a = dataOld.types) === null || _a === void 0 ? void 0 : _a.map(type => `${type.size}/${type.quantity}`).join(', ');
            const markup = `<form class="sub_main" action="" method="put" enctype="multipart/form-data">
                            <div class="nav">
                                <div class="above_table">
                                    <div class="ctg_name">
                                        <strong>Cập nhật sản phẩm</strong>
                                    </div>
                                </div>
                                <div class="add-new">
                                </div>
                            </div>
                            <div class="add_prod add_common">
                                <input type="hidden" name="oldImages" value='${JSON.stringify(dataOld.images)}'>
                                <div class="field">
                                    <label for="name">Tên sản phẩm</label>
                                    <input type="text" id="name" name="name" class="w-100 cm" value="${dataOld.name}">
                                </div>
                                <div class="field">
                                    <label for="price">Giá hiện tại</label>
                                    <input type="number" id="price" name="price" class="w-100 cm" value="${dataOld.price}">
                                </div>
                                <div class="field">
                                    <label for="orgPrice">Giá gốc</label>
                                    <input type="number" id="orgPrice" name="orgPrice" class="w-100 cm"  value="${dataOld.orgPrice}">
                                </div>
                                <div class="field">
                                    <label for="color">Màu sắc</label>
                                    <input type="string" id="color" name="color" class="w-100 cm"  value="${dataOld.color}">
                                </div>
                                <div class="field">
                                    <label for="hot">Trạng thái HOT</label>
                                    <select name="hot" id="hot">
                                        <option ${dataOld.hot ? 'selected' : ''} value="0">Không</option>
                                        <option ${dataOld.hot ? 'selected' : ''} value="1">Có</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <label for="category">Danh mục</label>
                                    <select name="categoryId" id="category">
                                        ${categories.map(cate => `<option ${dataOld.categoryId === cate._id ? 'selected' : ''} value="${cate._id}">${cate.name}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="field">
                                    <label for="description">Mô tả sản phẩm</label>
                                    <textarea name="description" id="description" rows="10">${dataOld.description}</textarea>
                                </div>
                                <div class="field">
                                    <label for="images">Hình ảnh</label>
                                    <input type="file" id="images" name="images" multiple>
                                    <div class="img-preview">
                                        ${(_b = dataOld.images) === null || _b === void 0 ? void 0 : _b.map(img => `<img src="${img}" alt="${dataOld.name}">`).join('')}
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
