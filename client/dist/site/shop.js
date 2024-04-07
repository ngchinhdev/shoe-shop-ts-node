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
const totalResultLabel = document.querySelector('.total_results');
export function updateTotalResults(value) {
    totalResultLabel.innerText = `${value} Kết quả`;
}
const filterAndSort = (products) => __awaiter(void 0, void 0, void 0, function* () {
    const filterPriceCheckboxes = document.querySelectorAll('.price_checkbox:checked');
    const filterDiscountCheckboxes = document.querySelectorAll('.discount_checkbox:checked');
    const filterSelectOptions = document.querySelector('.filter select');
    const productFiltered = products.filter(product => {
        const priceCondition = Array.from(filterPriceCheckboxes).some(checkbox => {
            const rangePrice = checkbox.value.split('-');
            const minPrice = +rangePrice[0];
            const maxPrice = +rangePrice[1] || Infinity;
            return product.price >= minPrice && product.price <= maxPrice;
        });
        const discountCondition = Array.from(filterDiscountCheckboxes).some(checkbox => {
            const rangeDiscount = checkbox.value.split('-');
            const minDiscount = +rangeDiscount[0];
            const maxDiscount = +rangeDiscount[1] || Infinity;
            const discount = product.orgPrice ? 100 - +(product.price / product.orgPrice * 100) : 0;
            return discount >= minDiscount && discount <= maxDiscount;
        });
        return (!filterPriceCheckboxes.length || priceCondition) && (!filterDiscountCheckboxes.length || discountCondition);
    });
    if (filterSelectOptions.value === 'inc') {
        productFiltered.sort(function (a, b) {
            return a.price - b.price;
        });
    }
    else if (filterSelectOptions.value === 'dec') {
        productFiltered.sort(function (a, b) {
            return b.price - a.price;
        });
    }
    updateTotalResults(productFiltered.length);
    handlePagination(paginationContainer, productFiltered);
    yield generateProducts(shopProductContainer, productFiltered.slice(0, 6));
});
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
            if (!categoryQuery && !searchQuery) {
                products = yield getFullData(`products`);
            }
            updateTotalResults(products.length);
            yield generateProducts(shopProductContainer, products === null || products === void 0 ? void 0 : products.slice(0, 6));
            handlePagination(paginationContainer, products);
            handleLikeAddCart();
            const filterCondition = document.querySelectorAll('.price_checkbox, .discount_checkbox');
            const filterSelect = document.querySelector('.filter select');
            filterCondition.forEach(checkbox => {
                checkbox.addEventListener('change', () => filterAndSort(products));
            });
            filterSelect.addEventListener('change', () => filterAndSort(products));
        }
        catch (error) {
            console.error(error);
            return;
        }
    });
})();
