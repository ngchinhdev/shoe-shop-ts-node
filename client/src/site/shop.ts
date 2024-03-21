import { getFullData } from "../api/apiData.js";
import { generateProducts } from "./markups/productMarkup.js";

const shopProductContainer = document.querySelector('.list_prod') as HTMLDivElement;

(async function () {
    const products = await getFullData('products');

    await generateProducts(shopProductContainer, products.slice(0, 6));
})();
