export const BASE_URL = 'http://localhost:8080/api/shoe';

export async function getFullData(endpoint: string) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`);

        if (!res.ok) throw new Error("Failed to fetch data.");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

export async function getSingleData(endpoint: string, id: string) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}`);

        if (!res.ok) throw new Error("Failed to fetch data.");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

export async function postData(endpoint: string, data: object) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Failed to post data.");

        return res;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

export async function updateData(endpoint: string, id: string, newData: object) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        });

        if (!res.ok) throw new Error("Failed to update data.");

        return res;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

export async function deleteData(endpoint: string, id: string) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete data.");

        return res;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}