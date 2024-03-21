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
import { generateInfoProduct } from "./markups/detailMarkup.js";
import { generateProducts } from "./markups/productMarkup.js";
const relatedProductContainer = document.querySelector('.list_prod');
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const params = new URLSearchParams(window.location.search);
        const idProd = params.get('id');
        const relatedProducts = yield getFullData('products');
        const product = yield getData('products', idProd);
        // Generate details product
        yield generateInfoProduct(product);
        yield generateProducts(relatedProductContainer, relatedProducts.slice(0, 4));
    });
})();
