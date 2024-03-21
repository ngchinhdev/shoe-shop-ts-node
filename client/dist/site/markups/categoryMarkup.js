var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loaderDot } from "../../utils/loaders.js";
export function generateMenuCategories(container, categories) {
    return __awaiter(this, void 0, void 0, function* () {
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', categories.map(category => `<li><a href="product.html?cate=${category._id}">${category.name}</a></li>`).join(''));
    });
}
export function generateHighlightCategories(container, categories) {
    return __awaiter(this, void 0, void 0, function* () {
        yield loaderDot(container);
        let markup = '';
        categories.map(category => {
            markup += `<div class="item_col">
                        <div class="item">
                            <img src="${category.image}" alt="${category.name}">
                            <h5>
                                <a href="product.html?cate=${category._id}">${category.name}</a>
                            </h5>
                        </div>
                    </div>`;
        });
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', markup);
    });
}
