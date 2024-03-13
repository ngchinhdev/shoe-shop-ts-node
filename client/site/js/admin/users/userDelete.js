import { deleteUser } from "../../api/apiUsers.js";
import initUsers from "./userRow.js";

export default async function handleDeleteUser(idUser, container) {
    const isDelete = confirm("Bạn có chắc chắn muốn xóa?");

    if (!isDelete) return;

    await deleteUser(idUser);
    await initUsers(container);
}