import { BASE_URL, getData } from "./apiData.js";

const CATEGORY_URL = 'categoriesProduct';

export async function getCategories() {
    const categories = await getData(CATEGORY_URL);

    return categories;
}

export async function getCategory(idCate) {
    const category = await getData(`${CATEGORY_URL}/${idCate}`);

    return category;
}

export async function addCategory(newCate) {
    try {
        const response = await fetch(`${BASE_URL}/${CATEGORY_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCate),
        });

        if (!response.ok) {
            throw new Error('Failed to add a new item');
        }
    } catch (error) {
        console.error('An error occurred when add new category:', error.message);
    }
}

export async function updateCategory(idCate, updateCate) {
    try {
        const response = await fetch(`${BASE_URL}/${CATEGORY_URL}/${idCate}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateCate),
        });

        if (!response.ok) {
            throw new Error('Failed to update item');
        }
    } catch (error) {
        console.error('An error occurred when update category:', error.message);
    }
}

export async function deleteCategory(idCate) {
    try {
        const response = await fetch(`${BASE_URL}/${CATEGORY_URL}/${idCate}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
    } catch (error) {
        console.error('An error occurred when delete category: ', error.message);
    }
}
