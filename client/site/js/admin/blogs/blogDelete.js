import { deleteBlog } from "../../api/apiBlogs.js";
import initBlogs from "./blogRow.js";

export default async function handleDeleteBlog(idBlog, container) {
    const isDelete = confirm("Bạn có chắc chắn muốn xóa?");

    if (!isDelete) return;

    await deleteBlog(idBlog);
    await initBlogs(container);
}