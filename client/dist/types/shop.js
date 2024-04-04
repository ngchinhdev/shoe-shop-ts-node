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
import { generateProducts } from "../site/markups/productMarkup.js";
export const shopProductContainer = document.querySelector('.list_prod');
const paginationContainer = document.querySelector('.product_pagination');
const totalResultLabel = document.querySelector('.total_results');
const filterSelectOptions = document.querySelector('.filter select');
const filterPrice = document.querySelector('.price.filter_side');
const filterDiscount = document.querySelector('.discount.filter_side');
let filterOption = '';
let sortOption = '';
export function updateTotalResults(value) {
    totalResultLabel.innerText = `${value} Kết quả`;
}
const getFilterProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield getFullData(`products/filter?${filterOption}&sort=${sortOption}`);
    yield generateProducts(shopProductContainer, products.slice(0, 6));
});
filterSelectOptions.addEventListener('change', function () {
    return __awaiter(this, void 0, void 0, function* () {
        paginationContainer.innerHTML = '';
        const type = filterSelectOptions.value;
        if (type === 'inc') {
            sortOption = 'inc';
        }
        if (type === 'dec') {
            sortOption = 'dec';
        }
        if (type === 'all') {
            sortOption = 'all';
        }
        getFilterProducts();
    });
});
filterPrice.addEventListener('change', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        paginationContainer.innerHTML = '';
        const checkbox = e.target;
        if (!checkbox.classList.contains('price_checkbox'))
            return;
        const checkboxValue = JSON.parse(checkbox.value.replace(/'/g, '"'));
        let noChecked = false;
        // if (!checkbox.checked) {
        //     if (checkboxValue[0] === 'under') {
        //         products = filteredProducts.filter(product => product.price > +checkboxValue[1]);
        //     }
        //     if (checkboxValue[0] === 'above') {
        //         products = filteredProducts.filter(product => product.price < +checkboxValue[1]);
        //     }
        //     if (!isNaN(+checkboxValue[0])) {
        //         products = filteredProducts.filter(product => product.price < +checkboxValue[0] || product.price >= +checkboxValue[1]);
        //     }
        // }
        if (checkbox.checked) {
            if (checkboxValue[0] === 'under') {
                if (filterOption.includes('bottomPrice')) {
                    filterOption = filterOption.replace(/bottomPrice=\d+/g, `bottomPrice=0`);
                }
                filterOption += `&bottomPrice=0&topPrice=${checkboxValue[1]}`;
            }
            if (checkboxValue[0] === 'above') {
                filterOption += `&topPrice=1000000000&bottomPrice=${checkboxValue[1]}`;
            }
            if (!isNaN(+checkboxValue[0])) {
                filterOption += `&bottomPrice=${checkboxValue[0]}&topPrice=${checkboxValue[1]}`;
            }
        }
        getFilterProducts();
    });
});
filterDiscount.addEventListener('change', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        paginationContainer.innerHTML = '';
        const checkbox = e.target;
        if (!checkbox.classList.contains('discount_checkbox'))
            return;
        const checkboxValue = JSON.parse(checkbox.value.replace(/'/g, '"'));
        let noChecked = false;
        // if (!checkbox.checked) {
        //     if (checkboxValue[0] === 'under') {
        //         products = filteredProducts.filter(product => 100 - (product.price / product.orgPrice * 100) > +checkboxValue[1]);
        //     }
        //     if (checkboxValue[0] === 'above') {
        //         products = filteredProducts.filter(product => 100 - (product.price / product.orgPrice * 100) < +checkboxValue[1]);
        //     }
        //     if (!isNaN(+checkboxValue[0])) {
        //         products = filteredProducts.filter(product => 100 - (product.price / product.orgPrice * 100) < +checkboxValue[0] || 100 - (product.price / product.orgPrice * 100) >= +checkboxValue[1]);
        //     }
        //     const allCheckbox = document.querySelectorAll('.price_checkbox');
        //     noChecked = [...allCheckbox].every(checkbox => !checkbox.checked);
        //     if (noChecked) products = orgProducts;
        // }
        if (checkbox.checked) {
            if (checkboxValue[0] === 'under') {
                filterOption += `&bottomDiscount=0&topDiscount=${checkboxValue[1]}`;
            }
            if (checkboxValue[0] === 'above') {
                filterOption += `&topDiscount=100&bottomDiscount=${checkboxValue[1]}`;
            }
            if (!isNaN(+checkboxValue[0])) {
                filterOption += `&bottomDiscount=${checkboxValue[0]}&topDiscount=${checkboxValue[1]}`;
            }
        }
        getFilterProducts();
    });
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
            if (!products) {
                shopProductContainer.innerHTML = '<p class="not-found">Không có sản phẩm nào!</p>';
                return;
            }
            if (!categoryQuery && !searchQuery) {
                products = yield getFullData(`products?${filterOption}&sort=${sortOption}`);
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
