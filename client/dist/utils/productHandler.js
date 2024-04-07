var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from "../api/apiData.js";
import { generatePagination, generateProducts } from "../site/markups/productMarkup.js";
import { getCart, setCart } from "./helpers.js";
import updateHeader from "./updateHeader.js";
const productContainer = document.querySelector('.list_prod');
export function addToCart(curId, quantity = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = getCart();
        let itemExists = false;
        const { price } = yield getData('products', curId);
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            if (item.id === curId) {
                item.quantity += quantity;
                itemExists = true;
                break;
            }
        }
        if (!itemExists) {
            const newItem = {
                id: curId,
                quantity: quantity,
                price
            };
            cart.push(newItem);
        }
        setCart(cart);
        updateHeader();
    });
}
;
export function handleLikeAddCart() {
    document.querySelector('.list_prod').addEventListener('click', function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            const btn = e.target;
            if (btn.hasAttribute('data-cart')) {
                e.preventDefault();
                const curId = btn.dataset.cart;
                yield addToCart(curId);
            }
        });
    });
}
export function handlePagination(container, products) {
    const perPage = 6;
    const totalPages = Math.ceil(products.length / perPage);
    generatePagination(container, totalPages);
    container.addEventListener('click', function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const btn = e.target;
            if (!btn.hasAttribute('data-page'))
                return;
            e.preventDefault();
            const curPage = +btn.dataset.page;
            const offset = curPage * perPage;
            const limit = offset + perPage;
            container.innerHTML = '';
            yield generateProducts(productContainer, products.slice(offset, limit));
            generatePagination(container, totalPages, curPage);
        });
    });
}
