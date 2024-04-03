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
import { handleLikeAddCart, handlePagination } from "../utils/productHandler.js";
import { generateProducts } from "./markups/productMarkup.js";
export const shopProductContainer = document.querySelector('.list_prod');
const paginationContainer = document.querySelector('.product_pagination');
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const searchParams = new URLSearchParams(window.location.search);
        const categoryQuery = searchParams.get('cate');
        const searchQuery = searchParams.get('query');
        try {
            let products = [];
            if (categoryQuery) {
                products = yield getFullData(`products/categoryId/${categoryQuery}`);
            }
            if (searchQuery) {
                products = yield getFullData(`products/search/${searchQuery}`);
            }
            if (!products) {
                shopProductContainer.innerHTML = '<p class="not-found">Không có sản phẩm nào!</p>';
                return;
            }
            if (!categoryQuery && !searchQuery) {
                products = yield getFullData('products');
            }
            yield generateProducts(shopProductContainer, products.slice(0, 6));
            handlePagination(paginationContainer, products);
            handleLikeAddCart();
        }
        catch (error) {
            console.error(error);
        }
    });
})();
