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
import { generateHighlightCategories } from "./markups/categoryMarkup.js";
import { generateProducts } from "./markups/productMarkup.js";
import { generateBlogs } from "./markups/blogMarkup.js";
import { handleLikeAddCart } from "../utils/productHandler.js";
const hotProductsControl = document.querySelector('.hot_product .list_cate');
const hotProductContainer = document.querySelector('.list_prod');
const highlightCategoryContainer = document.querySelector('.random_cate .container');
const blogContainer = document.querySelector('.blog .blog_row');
function handleFilterProducts(products) {
    hotProductsControl.addEventListener('click', function (e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const control = e.target;
            if (!control.hasAttribute('data-list'))
                return;
            (_a = hotProductsControl.querySelector('li.active')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            control.classList.add('active');
            if (control.dataset.list) {
                const clickedFilterId = control.dataset.list;
                const filteredProducts = products === null || products === void 0 ? void 0 : products.filter(product => product.categoryId === clickedFilterId);
                if (filteredProducts && clickedFilterId !== 'all')
                    yield generateProducts(hotProductContainer, filteredProducts);
                else {
                    if (products)
                        yield generateProducts(hotProductContainer, products.slice(0, 8));
                }
            }
        });
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield getFullData('products/hot');
        const categories = yield getFullData('categories');
        const blogs = yield getFullData('blogs');
        yield generateHighlightCategories(highlightCategoryContainer, categories.slice(0, 4));
        yield generateProducts(hotProductContainer, products.slice(0, 8));
        yield generateBlogs(blogContainer, blogs.slice(0, 3));
        handleFilterProducts(products);
        handleLikeAddCart();
    });
})();
