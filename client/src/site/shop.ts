import { getFullData } from "../api/apiData.js";
import { IProduct } from "../types/products.js";
import { handleLikeAddCart, handlePagination } from "../utils/productHandler.js";
import { generatePagination, generateProducts } from "./markups/productMarkup.js";

export const shopProductContainer = document.querySelector('.list_prod') as HTMLDivElement;
const paginationContainer = document.querySelector('.product_pagination') as HTMLDivElement;

(async function () {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryQuery = searchParams.get('cate');
    const searchQuery = searchParams.get('query');

    try {
        let products: IProduct[] = [];

        if (categoryQuery) {
            products = await getFullData(`products/categoryId/${categoryQuery}`);
        }

        if (searchQuery) {
            products = await getFullData(`products/search/${searchQuery}`);
        }

        if (!products) {
            shopProductContainer.innerHTML = '<p class="not-found">Không có sản phẩm nào!</p>';
            return;
        }

        if (!categoryQuery && !searchQuery) {
            products = await getFullData('products');
        }

        await generateProducts(shopProductContainer, products.slice(0, 6));
        handlePagination(paginationContainer, products);
        handleLikeAddCart();
    } catch (error) {
        console.error(error);
    }
})();
