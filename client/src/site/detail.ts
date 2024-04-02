import { getData, getFullData } from "../api/apiData.js";
import { generateInfoProduct } from "./markups/detailMarkup.js";
import { generateProducts } from "./markups/productMarkup.js";

const informationContainer = document.querySelector('.detail_row') as HTMLDivElement;
const relatedProductContainer = document.querySelector('.list_prod') as HTMLDivElement;

const handleControl = () => {
    const mainImage = document.querySelector('.main_pic img') as HTMLImageElement;
    const smallImages = Array.from(document.querySelectorAll('.pic_col img')) as HTMLImageElement[];

    smallImages.forEach(img => img.addEventListener('click', function () {
        mainImage.src = img.src;
    }));
};

(async function () {
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const idProd = queryParams.get('id') as string;
        const cate = queryParams.get('cate') as string;

        const relatedProducts = await getFullData(`products/categoryId/${cate}`);
        const product = await getData('products', idProd);

        // Generate details product
        await generateInfoProduct(informationContainer, product);
        handleControl();

        await generateProducts(relatedProductContainer, relatedProducts.slice(0, 4));
    } catch (error) {
        relatedProductContainer.innerHTML = '<p class="not-found">Không có sản phẩm nào!</p>';
        console.log(error);
    }
})()

