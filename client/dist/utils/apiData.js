"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.postData = exports.getSingleData = exports.getFullData = exports.BASE_URL = void 0;
exports.BASE_URL = 'http://localhost:8080/api/shoe';
function getFullData(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${exports.BASE_URL}/${endpoint}`);
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
}
exports.getFullData = getFullData;
function getSingleData(endpoint, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${exports.BASE_URL}/${endpoint}/${id}`);
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
}
exports.getSingleData = getSingleData;
function postData(endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${exports.BASE_URL}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
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
}
exports.postData = postData;
function updateData(endpoint, id, newData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${exports.BASE_URL}/${endpoint}/${id}`, {
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
}
exports.updateData = updateData;
function deleteData(endpoint, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${exports.BASE_URL}/${endpoint}/${id}`, {
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
}
exports.deleteData = deleteData;