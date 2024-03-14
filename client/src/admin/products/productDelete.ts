import { deleteData } from "../../api/apiData.js";
import initProducts from "./productRows.js";

export default async function handleDeleteProduct(idProd: string, container: HTMLDivElement) {
    const isDelete = confirm("Bạn có chắc chắn muốn xóa?");

    if (!isDelete) return;

    await deleteData('products', idProd);
    await initProducts(container);
}