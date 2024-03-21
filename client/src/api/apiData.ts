export const BASE_URL = 'http://localhost:8080/api/shoe';

export const getFullData = async (endpoint: string, query?: string) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${query || ''}`);

        if (!res.ok) throw new Error("Failed to fetch data.");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

export const getData = async (endpoint: string, id: string) => {
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
};

export const postData = async (endpoint: string, data: FormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            body: data,
        });

        if (!res.ok) throw new Error("Failed to post data.");

        return res;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

export const updateDataForm = async (endpoint: string, id: string, newData: FormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "PUT",
            body: newData,
        });

        if (!res.ok) throw new Error("Failed to update data.");

        return res;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

export const updateDataJSON = async (endpoint: string, id: string, newData: object) => {
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
};

export const deleteData = async (endpoint: string, id: string) => {
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
};