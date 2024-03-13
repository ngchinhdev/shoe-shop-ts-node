import { updateRoleUser } from "../../api/apiUsers.js";

export default async function handleUpdateUser(idUser, updateRole, container) {
    await updateRoleUser(idUser, updateRole);
}