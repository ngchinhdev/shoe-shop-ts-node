import { deleteCategory } from "../../api/apiCategories.js";
import initCategories from "./categoryRow.js";

export default async function handleDeleteCategory(idCate, container) {
    const isDelete = confirm("Bạn có chắc chắn muốn xóa?");

    if (!isDelete) return;

    await deleteCategory(idCate);
    await initCategories(container);
}