import { getProducts } from "../api/apiProducts.js";
import { generateNavigation } from "./markups/navigationMarkup.js";
import { generateProducts, noResult } from "./markups/productsMarkup.js";
import { handleLikeAddCart } from "../utils/addToCart.js";
import { filterByPrice, filterIncDec, handlePagination, updateTotalResults } from "../utils/filterProducts.js";

const productContainer = document.querySelector('.list_prod');
const paginationContainer = document.querySelector('.product_pagination');

const params = new URLSearchParams(window.location.search);
const queryValue = params.get('query');
const cateId = params.get('cate');

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function init() {
    if (queryValue) {
        const orgProducts = await getProducts();

        await generateNavigation(null, queryValue);

        const filteredProducts = orgProducts.filter(product => removeDiacritics(product.name).toLowerCase().includes(removeDiacritics(queryValue.toLowerCase())));

        if (!filteredProducts.length) {
            noResult(productContainer, "Không tìm thấy sản phẩm tương ứng.");
            return;
        }

        const totalResults = await generateProducts(productContainer, filteredProducts);
        updateTotalResults(totalResults);
        handlePagination(paginationContainer, filteredProducts);
        filterIncDec(filteredProducts);
        filterByPrice(filteredProducts);
    }

    if (cateId) {
        const orgProducts = await getProducts();

        await generateNavigation(cateId);

        const filteredProducts = orgProducts.filter(product => product.category == cateId);

        const totalResults = await generateProducts(productContainer, filteredProducts);
        updateTotalResults(totalResults);
        handlePagination(paginationContainer, filteredProducts);
        filterIncDec(filteredProducts);
        filterByPrice(filteredProducts);
    }

    handleLikeAddCart();
}

init();

