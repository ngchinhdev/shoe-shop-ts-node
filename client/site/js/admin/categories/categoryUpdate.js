import { getCategory, updateCategory } from "../../api/apiCategories.js";
import { loader2 } from "../../utils/loader.js";
import initCategories from "./categoryRow.js";

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
                            <div class="field">
                                <label for="name">Tên danh mục</label>
                                <input type="text" id="name" class="cm" name="name" value="${dataOld.name}">
                            </div>
                            <div class="field">
                                <label for="image">Hình ảnh</label>
                                <input type="file" id="image" name="image">
                            </div>
                        </div>
                        <div>
                            <button class="btn-add">Cập nhật</button>
                        </div>
                    </form>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function handleUpdateCategory(idCate, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const dataOld = await getCategory(idCate);
    generateUpdateMarkup(dataOld, container);

    const formAdd = document.querySelector('form');

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = new FormData(formAdd);
        const formData = Object.fromEntries(form);

        if (!formData.name) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận chỉnh sửa danh mục?');

        if (!isAdd) return;

        await updateCategory(idCate, { ...formData, image: formData.image.name ? formData.image.name : dataOld.image });
        await initCategories(container);
    });
}
