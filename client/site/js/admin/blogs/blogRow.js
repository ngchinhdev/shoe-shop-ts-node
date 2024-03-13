import { getBlogs } from "../../api/apiBlogs.js";
import { loader2 } from "../../utils/loader.js";
import handlePagination, { generatePagination } from "../common/pagination.js";
import handleAddBlog from "./blogAdd.js";
import handleDeleteBlog from "./blogDelete.js";
import handleUpdateBlog from "./blogUpdate.js";

const PER_PAGE = 10;

async function generateMarkup(blogsData, startIdx, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const markup = `<div class="nav">
                        <div class="above_table">
                            <div class="ctg_name">
                                <strong>Bài viết</strong>
                            </div>
                        </div>
                        <div class="add-new">
                            <span>+ Thêm mới</span>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Tiêu đề</th>
                            <th>Hình ảnh</th>
                            <th>Bình luận</th>
                            <th>Nội dung</th>
                            <th>Thao tác</th>
                        </tr>
                ${blogsData.map((blog, index) => markupRow(blog, index, startIdx)).join('')}
            </table>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

function markupRow(blog, index, startIdx) {
    return `<tr>
                <td>
                    ${startIdx + index + 1}
                </td>
                <td>
                    ${blog.title}
                </td>
                <td>
                    <img src="images/blogs/${blog.thumbnail}" class="ctn" alt="${blog.name}">
                </td>
                <td>
                    ${blog.comments}
                </td>
                <td class="ctn-blog">
                   <p>${blog.contents}</p>
                </td>
                <td>
                    <div class="last-td">
                        <span data-id=${blog.id} class="change-btn">Sửa</span>
                        <span data-id=${blog.id} class="del-btn">Xóa</span>
                    </div>
                </td>
            </tr>`;
}

export default async function initBlogs(container, curPage = 0) {
    const blogsData = await getBlogs();

    const totalPages = Math.ceil(blogsData.length / PER_PAGE);

    const startIdx = curPage * PER_PAGE;
    const endIdx = startIdx + PER_PAGE;

    await generateMarkup(blogsData.slice(startIdx, endIdx), startIdx, container);
    generatePagination(totalPages, curPage, container);

    const addNewBtn = document.querySelector('.add-new span');
    const table = document.querySelector('table');
    const pagination = document.querySelector('.pagination');

    addNewBtn.addEventListener('click', async function () {
        await handleAddBlog(container);
    });

    table.addEventListener('click', async function (e) {
        const btn = e.target;

        if (btn.classList.contains('del-btn')) {
            const idBlog = btn.dataset.id;

            await handleDeleteBlog(idBlog, container);
        }

        if (btn.classList.contains('change-btn')) {
            const idBlog = btn.dataset.id;

            await handleUpdateBlog(idBlog, container);
        }
    });

    pagination.addEventListener('click', async function (e) {
        const btn = e.target;

        if (!btn.hasAttribute('data-page')) return;

        const pageNumber = +btn.dataset.page;

        await handlePagination(container, pageNumber, initBlogs);
    });
}