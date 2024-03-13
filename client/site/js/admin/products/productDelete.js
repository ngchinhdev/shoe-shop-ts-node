import { deleteProduct } from "../../api/apiProducts.js";
import initProducts from "./productRow.js";


export default async function handleDeleteProduct(idProd, container) {
    const isDelete = confirm("Bạn có chắc chắn muốn xóa?");

    if (!isDelete) return;

    await deleteProduct(idProd);
    await initProducts(container);
}