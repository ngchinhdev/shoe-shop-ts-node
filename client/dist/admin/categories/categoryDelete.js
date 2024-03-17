var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteData } from "../../api/apiData.js";
import initCategories from "./categoryRows.js";
export default function handleDeleteCategory(idCate, container) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDelete = confirm("Bạn có chắc chắn muốn xóa?");
        if (!isDelete)
            return;
        yield deleteData('categories', idCate);
        yield initCategories(container);
    });
}
