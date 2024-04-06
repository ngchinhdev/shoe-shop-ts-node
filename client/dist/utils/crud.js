var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getFullData } from "../api/apiData.js";
import { loaderCircle } from "./loaders.js";
export default class CRUD {
    constructor(endpoint) {
        this.initialize(endpoint);
    }
    initialize(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            this.container = document.querySelector('main');
            yield this.loader();
            this.data = yield getFullData(endpoint);
            yield this.generateMainMarkup(yield this.data);
            this.addNewBtn = document.querySelector('.add-new span');
            this.table = document.querySelector('table');
            yield this.handleCRUD();
        });
    }
    handleCRUD() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.addNewBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                yield this.handleAdd();
            }));
            this.table.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                const btn = e.target;
                if (btn.classList.contains('del-btn')) {
                    const id = btn.dataset.id;
                    yield this.handleDelete(id);
                }
                if (btn.classList.contains('change-btn')) {
                    const id = btn.dataset.id;
                    yield this.handleUpdate(id);
                }
                if (btn.classList.contains('detail-btn')) {
                    const id = btn.dataset.id;
                    yield this.handleDetail(id);
                }
            }));
        });
    }
    loader() {
        return __awaiter(this, void 0, void 0, function* () {
            this.container.innerHTML = '';
            yield loaderCircle(this.container, 500);
        });
    }
    clearAndInsertToContainer(markup) {
        this.container.innerHTML = '';
        this.container.insertAdjacentHTML('beforeend', markup);
    }
    handleDetail(id) { }
}
