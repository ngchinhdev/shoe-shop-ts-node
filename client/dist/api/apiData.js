var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const BASE_URL = 'http://localhost:8080/api/shoe';
export const getFullData = (endpoint, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BASE_URL}/${endpoint}/${query || ''}`);
        if (!res.ok)
            throw new Error("Failed to fetch data.");
        const data = yield res.json();
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
});
export const getData = (endpoint, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BASE_URL}/${endpoint}/${id}`);
        if (!res.ok)
            throw new Error("Failed to fetch data.");
        const data = yield res.json();
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
});
export const postData = (endpoint, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            body: data,
        });
        if (!res.ok)
            throw new Error("Failed to post data.");
        return res;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
});
export const updateDataForm = (endpoint, id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "PUT",
            body: newData,
        });
        if (!res.ok)
            throw new Error("Failed to update data.");
        return res;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
});
export const updateDataJSON = (endpoint, id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        });
        if (!res.ok)
            throw new Error("Failed to update data.");
        return res;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
});
export const deleteData = (endpoint, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error("Failed to delete data.");
        return res;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
});
