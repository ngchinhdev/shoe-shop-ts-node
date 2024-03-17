var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData, getFullData, updateData } from "../../api/apiData.js";
import { loaderCircle } from "../../utils/loaders.js";
import initProducts from "./productRows.js";
function generateUpdateMarkup(dataOld, categories, container) {
    var _a, _b;
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
                                <label for="types">Size/Số lượng (Cách nhau bởi dấu phẩy ',')</label>
                                <input type="text" id="types" name="types" class="w-100 cm"  value="${convertTypes}">
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
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}
export default function handleUpdateProduct(idProd, container) {
    return __awaiter(this, void 0, void 0, function* () {
        container.innerHTML = '';
        yield loaderCircle(container, 500);
        const dataOld = yield getData('products', idProd);
        const categories = yield getFullData('categories');
        generateUpdateMarkup(dataOld, categories, container);
        const formAdd = document.querySelector('form');
        formAdd.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const form = new FormData(formAdd);
            const name = form.get('name');
            const price = form.get('price');
            const orgPrice = form.get('orgPrice');
            const description = form.get('description');
            const hot = form.get('hot');
            const types = form.get('types');
            const color = form.get('color');
            const categoryId = form.get('categoryId');
            if (!name || !description || !price || !orgPrice || !hot || !color || !types || !categoryId) {
                alert('Vui lòng nhập đầy đủ các trường!');
                return;
            }
            const isUpdate = confirm('Xác nhận cập nhật sản phẩm?');
            if (!isUpdate)
                return;
            yield updateData('products', idProd, form);
            yield initProducts(container);
        }));
    });
}
