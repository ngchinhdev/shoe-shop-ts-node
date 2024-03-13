import { getCategories } from "../../api/apiCategories.js";
import { getProducts, updateProd } from "../../api/apiProducts.js";
import { loader2 } from "../../utils/loader.js";
import initProducts from "./productRow.js";

function generateUpdateMarkup(dataOld, categories, container) {
    const markup = `<form class="sub_main" action="" method="patch">
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
                            <div class="field">
                                <label for="name">Tên sản phẩm</label>
                                <input type="text" id="name" value=${dataOld.name} name="name" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="price">Giá sản phẩm</label>
                                <input type="number" id="price" value=${dataOld.price} name="price" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="orgPrice">Giá gốc</label>
                                <input type="number" id="orgPrice" value=${dataOld.orgPrice} name="orgPrice" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="quantity">Số lượng</label>
                                <input type="number" id="quantity" value=${dataOld.quantity} name="quantity" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="mass">Khối lượng</label>
                                <input type="text" id="mass" value=${dataOld.mass} name="mass" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="category">Danh mục</label>
                                <select name="category" id="category">
                                    ${categories.map(cate => `<option value="${cate.id}" ${cate.id == dataOld.category ? 'selected' : ''}>${cate.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="field">
                                <label for="description">Mô tả sản phẩm</label>
                                <textarea name="description" id="description" rows="10">${dataOld.description}</textarea>
                            </div>
                            <div class="field">
                                <label for="image">Hình ảnh</label>
                                <input type="file" id="image" name="image" multiple>
                            </div>
                        </div>
                        <div>
                            <button class="btn-add">Cập nhật</button>
                        </div>
                    </form>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function handleUpdateProduct(idProd, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const dataOld = await getProducts(idProd);
    const categories = await getCategories();
    generateUpdateMarkup(dataOld, categories, container);

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

        const { name, description, mass, orgPrice, price, quantity, category } = formData;

        if (!name || !description || !mass || !orgPrice || !price || !quantity || !category) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận cập nhật sản phẩm?');

        if (!isAdd) return;

        const newImages = formData.images?.map(img => img.name);
        await updateProd(dataOld.id, {
            ...formData,
            images: !newImages?.length ? formData.images : newImages,
            purchased: formData.purchased,
            likes: formData.likes
        });
        await initProducts(container);
    });
}
