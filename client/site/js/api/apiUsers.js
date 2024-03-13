import { BASE_URL, getData } from "./apiData.js";

const USER_URL = 'users';

export async function getUser(param = '') {
    const users = await getData(`${USER_URL}/${param}`);

    return users;
}

export async function registerUser(newUser) {
    try {
        const response = await fetch(`${BASE_URL}/${USER_URL}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error('Failed to add user');
        }
    } catch (error) {
        console.error('An error occurred when add user: ', error.message);
    }
}

export async function deleteUser(idUser) {
    try {
        const response = await fetch(`${BASE_URL}/${USER_URL}/${idUser}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    } catch (error) {
        console.error('An error occurred when delete user: ', error.message);
    }
}

export async function updateRoleUser(idUser, updateRole) {
    try {
        const response = await fetch(`${BASE_URL}/${USER_URL}/${idUser}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ role: updateRole })
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    } catch (error) {
        console.error('An error occurred when update user: ', error.message);
    }
}

export async function confirmLogin(email, password) {
    const user = await getUser(`?email=${email}`);

    if (!user[0]) return 0;

    if (user[0].role == 1) return 1;

    if (user[0].password != password) return 2;

    return user[0];
}