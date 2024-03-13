import { updateOrderStatus } from "../../api/apiOrders.js";

export default async function handleUpdateOrder(idOrder, updateOrder) {
    await updateOrderStatus(idOrder, updateOrder);
}