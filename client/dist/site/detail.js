var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData, getFullData } from "../api/apiData.js";
import { handleLikeAddCart } from "../utils/productHandler.js";
import { generateInfoProduct } from "./markups/detailMarkup.js";
import { generateProducts } from "./markups/productMarkup.js";
const informationContainer = document.querySelector('.detail_row');
const relatedProductContainer = document.querySelector('.list_prod');
const handleControl = () => {
    const mainImage = document.querySelector('.main_pic img');
    const smallImages = Array.from(document.querySelectorAll('.pic_col img'));
    smallImages.forEach(img => img.addEventListener('click', function () {
        mainImage.src = img.src;
    }));
};
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            const idProd = queryParams.get('id');
            const cate = queryParams.get('cate');
            const relatedProducts = yield getFullData(`products/categoryId/${cate}`);
            const product = yield getData('products', idProd);
            // Generate details product
            yield generateInfoProduct(informationContainer, product);
            handleControl();
            yield generateProducts(relatedProductContainer, relatedProducts.slice(0, 4));
            handleLikeAddCart();
        }
        catch (error) {
            relatedProductContainer.innerHTML = '<p class="not-found">Không có sản phẩm nào!</p>';
            console.log(error);
        }
    });
})();
