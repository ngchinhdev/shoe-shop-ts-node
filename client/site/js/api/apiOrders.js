import { BASE_URL, getData } from "./apiData.js";

const ORDER_URL = 'orders';

export async function getOrdersInfo(id = '') {
    const ordersInfo = await getData(`${ORDER_URL}/${id}`);

    return ordersInfo;
}

export async function deleteOrder(idOrder) {
    try {
        const response = await fetch(`${BASE_URL}/${ORDER_URL}/${idOrder}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
    } catch (error) {
        console.error('An error occurred when delete order: ', error.message);
    }
}

export async function updateOrderStatus(idOrder, updateOrder) {
    try {
        const response = await fetch(`${BASE_URL}/${ORDER_URL}/${idOrder}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: updateOrder })
        });

        if (!response.ok) {
            throw new Error('Failed to update order');
        }
    } catch (error) {
        console.error('An error occurred when update order: ', error.message);
    }
}

export async function createNewOrder(newOrder) {
    try {
        const response = await fetch(`${BASE_URL}/${ORDER_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newOrder)
        });

        if (!response.ok) {
            throw new Error('Failed to add order');
        }
    } catch (error) {
        console.error("An error occurred when add order: ", error.message);
    }
}
