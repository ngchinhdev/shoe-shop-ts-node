import { getProducts } from "../api/apiProducts.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { handleLikeAddCart } from "../utils/addToCart.js";
import { filterByDiscount, filterByPrice, filterIncDec, handlePagination, updateTotalResults } from "../utils/filterProducts.js";

const shopProductContainer = document.querySelector('.list_prod');
const paginationContainer = document.querySelector('.product_pagination');

let filteredProducts = [];

async function init() {
    const orgProducts = await getProducts();

    await generateProducts(shopProductContainer, orgProducts.slice(0, 6));
    updateTotalResults(orgProducts.length);
    handlePagination(paginationContainer, orgProducts);

    handleLikeAddCart();

    filterIncDec(orgProducts, filteredProducts);
    filterByPrice(orgProducts, filteredProducts);
    filterByDiscount(orgProducts, filteredProducts);
}

init();
