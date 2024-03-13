import { BASE_URL, getData } from "./apiData.js";

const ROLE_URL = 'roles';

export async function getRole(id = '') {
    const roles = await getData(`${ROLE_URL}/${id}`);

    return roles;
}

export async function addRole(newRole) {
    try {
        const response = await fetch(`${BASE_URL}/${ROLE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRole),
        });

        if (!response.ok) {
            throw new Error('Failed to add a new role');
        }
    } catch (error) {
        console.error('An error occurred when add new role:', error.message);
    }
}

export async function updateRole(idRole, updateRole) {
    try {
        const response = await fetch(`${BASE_URL}/${ROLE_URL}/${idRole}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateRole),
        });

        if (!response.ok) {
            throw new Error('Failed to update role');
        }
    } catch (error) {
        console.error('An error occurred when update role:', error.message);
    }
}

export async function deleteRole(idRole) {
    try {
        const response = await fetch(`${BASE_URL}/${ROLE_URL}/${idRole}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete role');
        }
    } catch (error) {
        console.error('An error occurred when delete role: ', error.message);
    }
}