import { addCategory } from "../../api/apiCategories.js";
import { loader2 } from "../../utils/loader.js";
import initCategories from "./categoryRow.js";

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

export default async function handleAddCategory(container) {
    container.innerHTML = '';
    await loader2(container, 500);
    generateAddMarkup(container);

    const formAdd = document.querySelector('form');

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = new FormData(formAdd);
        const formData = Object.fromEntries(form);

        if (!formData.name || !formData.image.name) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận thêm danh mục?');

        if (!isAdd) return;

        await addCategory({ ...formData, image: formData.image.name });
        await initCategories(container);
    });
}

