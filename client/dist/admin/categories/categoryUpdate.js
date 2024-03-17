var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData, updateData } from "../../api/apiData.js";
import { loaderCircle } from "../../utils/loaders.js";
import initCategories from "./categoryRows.js";
function generateUpdateMarkup(dataOld, container) {
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
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}
export default function handleUpdateCategory(idCate, container) {
    return __awaiter(this, void 0, void 0, function* () {
        container.innerHTML = '';
        yield loaderCircle(container, 500);
        const dataOld = yield getData('categories', idCate);
        generateUpdateMarkup(dataOld, container);
        const formAdd = document.querySelector('form');
        formAdd.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const form = new FormData(formAdd);
            const name = form.get('name');
            if (!name) {
                alert('Vui lòng nhập đầy đủ các trường!');
                return;
            }
            const isAdd = confirm('Xác nhận cập nhật danh mục?');
            if (!isAdd)
                return;
            yield updateData('categories', idCate, form);
            yield initCategories(container);
        }));
    });
}
