import { getData, getFullData } from "../api/apiData.js";
import { generateInfoProduct } from "./markups/detailMarkup.js";
import { generateProducts } from "./markups/productMarkup.js";

const relatedProductContainer = document.querySelector('.list_prod') as HTMLDivElement;

(async function () {
    const params = new URLSearchParams(window.location.search);
    const idProd = params.get('id') as string;

    const relatedProducts = await getFullData('products');
    const product = await getData('products', idProd);

    // Generate details product
    await generateInfoProduct(product);
    await generateProducts(relatedProductContainer, relatedProducts.slice(0, 4));
})()

