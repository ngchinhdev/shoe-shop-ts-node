var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getFullData, postData } from "../../api/apiData.js";
import { loaderCircle } from "../../utils/loaders.js";
import initProducts from "./productRows.js";
function generateAddMarkup(categories, container) {
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
                                <label for="types">Size/Số lượng (Cách nhau bởi dấu phẩy ',')</label>
                                <input type="text" id="types" name="types" class="w-100 cm">
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
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}
export default function handleAddProduct(container) {
    return __awaiter(this, void 0, void 0, function* () {
        container.innerHTML = '';
        yield loaderCircle(container, 500);
        const categories = yield getFullData('categories');
        generateAddMarkup(categories, container);
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
            const images = form.getAll('images');
            if (!name || !description || !images[0].name || !price || !orgPrice || !hot || !color || !types || !categoryId) {
                alert('Vui lòng nhập đầy đủ các trường!');
                return;
            }
            const isAdd = confirm('Xác nhận thêm sản phẩm?');
            if (!isAdd)
                return;
            yield postData('products', form);
            yield initProducts(container);
        }));
    });
}
