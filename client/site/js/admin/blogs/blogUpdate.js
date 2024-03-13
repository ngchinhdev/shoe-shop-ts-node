import { getBlog, getCategoriesBlog, updateBlog } from "../../api/apiBlogs.js";
import { loader2 } from "../../utils/loader.js";
import initBlogs from "./blogRow.js";

function generateUpdateMarkup(dataOld, container, categoriesProduct) {
    const markup = `<form class="sub_main" action="" method="post">
                        <div class="nav">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Chỉnh sửa bài viết</strong>
                                </div>
                            </div>
                            <div class="add-new">
                            </div>
                        </div>
                        <div class="add_prod add_common">
                            <div class="field">
                                <label for="title">Tiêu đề</label>
                                <input type="text" id="title" value="${dataOld.title}" name="title" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="price">Nội dung</label>
                                <textarea name="contents" id="contents" rows="10">${dataOld.contents}</textarea>
                            </div>
                            <div class="field">
                                <label for="category">Danh mục</label>
                                <select name="category" id="category">
                                    ${categoriesProduct.map(cate => `<option ${cate.id == dataOld.category ? 'selected' : ''} value="${cate.id}">${cate.name}</option>`).join('')}
                                </select >
                            </div >
                            <div class="field">
                                <label for="image">Hình ảnh</label>
                                <input type="file" id="image" name="image">
                            </div>
                        </div >
                            <div>
                                <button class="btn-add">Cập nhật</button>
                            </div>
                    </form > `;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function handleUpdateBlog(idBlog, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const dataOld = await getBlog(idBlog);
    const blogCategories = await getCategoriesBlog();
    generateUpdateMarkup(dataOld, container, blogCategories);

    const formAdd = document.querySelector('form');

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = new FormData(formAdd);
        const formData = Object.fromEntries(form);

        if (!formData.title || !formData.contents) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận chỉnh sửa bài viết?');

        if (!isAdd) return;

        await updateBlog(idBlog, {
            title: formData.title,
            contents: formData.contents,
            thumbnail: !formData.image.name ? dataOld.thumbnail : formData.image.name,
        });

        initBlogs(container);
    });
};
