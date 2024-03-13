import { BASE_URL, getData } from "./apiData.js";

const PRODUCT_URL = 'products';

export async function getProducts(id = '') {
    const products = await getData(`products/${id}`);

    return products;
}

export async function deleteProduct(idProd) {
    try {
        const response = await fetch(`${BASE_URL}/${PRODUCT_URL}/${idProd}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
    } catch (error) {
        console.error('An error occurred when delete product: ', error.message);
    }
}

export async function addProduct(newProd) {
    try {
        const response = await fetch(`${BASE_URL}/${PRODUCT_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProd),
        });

        if (!response.ok) {
            throw new Error('Failed to add a new item');
        }
    } catch (error) {
        console.error('An error occurred when add new product:', error.message);
    }
}

export async function updateProd(idProd, updateProd) {
    try {
        const response = await fetch(`${BASE_URL}/${PRODUCT_URL}/${idProd}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateProd),
        });

        if (!response.ok) {
            throw new Error('Failed to update item');
        }
    } catch (error) {
        console.error('An error occurred when update product:', error.message);
    }
}

export async function updatePurchased(idProd, curPurchased, purchased, curQuantity) {
    try {
        const response = await fetch(`${BASE_URL}/${PRODUCT_URL}/${idProd}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ purchased: curPurchased + purchased, quantity: +curQuantity - 1 }),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }
    } catch (error) {
        console.error('An error occurred when update product:', error.message);
    }
}