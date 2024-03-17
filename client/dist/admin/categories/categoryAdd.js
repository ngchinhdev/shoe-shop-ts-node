var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { postData } from "../../api/apiData.js";
import { loaderCircle } from "../../utils/loaders.js";
import initCategories from "./categoryRows.js";
function generateAddMarkup(container) {
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
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}
export default function handleAddCategory(container) {
    return __awaiter(this, void 0, void 0, function* () {
        container.innerHTML = '';
        yield loaderCircle(container, 500);
        generateAddMarkup(container);
        const formAdd = document.querySelector('form');
        formAdd.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const form = new FormData(formAdd);
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
            yield initCategories(container);
        }));
    });
}
