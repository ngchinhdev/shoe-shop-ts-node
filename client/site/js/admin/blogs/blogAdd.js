import { addBlog, getCategoriesBlog } from "../../api/apiBlogs.js";
import { loader2 } from "../../utils/loader.js";
import initBlogs from "./blogRow.js";

function generateAddMarkup(container, blogCategories) {
    const markup = `<form class="sub_main" action="" method="post">
                        <div class="nav">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Thêm bài viết</strong>
                                </div>
                            </div>
                            <div class="add-new">
                            </div>
                        </div>
                        <div class="add_prod add_common">
                            <div class="field">
                                <label for="title">Tiêu đề</label>
                                <input type="text" id="title" name="title" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="price">Nội dung</label>
                                <textarea name="contents" id="contents" rows="10"></textarea>
                            </div>
                            <div class="field">
                                <label for="category">Danh mục</label>
                                <select name="category" id="category">
                                    ${blogCategories.map(cate => `<option value="${cate.id}">${cate.name}</option>`).join('')}
                                </select>
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

export default async function handleAddBlog(container) {
    container.innerHTML = '';
    await loader2(container, 500);
    const blogCategories = await getCategoriesBlog();
    generateAddMarkup(container, blogCategories);

    const formAdd = document.querySelector('form');

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = new FormData(formAdd);
        const formData = Object.fromEntries(form);

        if (!formData.title || !formData.contents || !formData.image.name) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận thêm bài viết?');

        if (!isAdd) return;

        await addBlog({
            title: formData.title,
            contents: formData.contents,
            thumbnail: formData.image.name,
            createAt: new Date().toISOString(),
            comments: Math.ceil(Math.random() * 100),
            category: +formData.category
        });

        initBlogs(container);
    });
}

