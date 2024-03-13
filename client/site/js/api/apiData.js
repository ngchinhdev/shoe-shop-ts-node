export const BASE_URL = 'http://localhost:3000';

export async function getData(url) {
    try {
        const res = await fetch(`${BASE_URL}/${url}`);

        if (!res.ok) throw new Error("Failed to fetch data.");

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error.message);
    }
}