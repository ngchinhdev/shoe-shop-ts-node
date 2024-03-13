import { deleteRole } from "../../api/apiRoles.js";
import initRoles from "./roleRow.js";

export default async function handleDeleteRole(idCate, container) {
    const isDelete = confirm("Bạn có chắc chắn muốn xóa?");

    if (!isDelete) return;

    await deleteRole(idCate);
    await initRoles(container);
}