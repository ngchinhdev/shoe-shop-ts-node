import { getCategories } from "../../api/apiCategories.js";
import { addProduct } from "../../api/apiProducts.js";
import { loader2 } from "../../utils/loader.js";
import initProducts from "./productRow.js";

function generateAddMarkup(categories, container) {
    const markup = `<form class="sub_main" action="" method="post">
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
                                <label for="price">Giá sản phẩm</label>
                                <input type="number" id="price" name="price" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="orgPrice">Giá gốc</label>
                                <input type="number" id="orgPrice" name="orgPrice" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="quantity">Số lượng</label>
                                <input type="number" id="quantity" name="quantity" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="mass">Khối lượng</label>
                                <input type="text" id="mass" name="mass" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="category">Danh mục</label>
                                <select name="category" id="category">
                                    ${categories.map(cate => `<option value="${cate.id}">${cate.name}</option>`).join('')}
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

export default async function handleAddProduct(container) {
    container.innerHTML = '';
    await loader2(container, 500);
    const categories = await getCategories();
    generateAddMarkup(categories, container);

    const formAdd = document.querySelector('form');

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = new FormData(formAdd);
        const formData = {};

        for (let [key, value] of form.entries()) {
            if (key === "images") {
                formData[key] = formData[key] || [];
                formData[key].push(value);
            } else {
                formData[key] = value;
            }
        }

        const { name, description, images, mass, orgPrice, price, quantity, category } = formData;

        if (!name || !description || !images.length || !mass || !orgPrice || !price || !quantity || !category) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận thêm sản phẩm?');

        if (!isAdd) return;

        await addProduct({
            ...formData,
            images: formData.images.map(img => img.name),
            purchased: 0,
            likes: 0
        });
        await initProducts(container);
    });
}

