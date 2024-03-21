import { type ICategory } from "../types/categories.js";
import { type IProduct } from "../types/products.js";
import { getFullData } from "../api/apiData.js";
import { generateHighlightCategories, generateMenuCategories } from "./markups/categoryMarkup.js";
import { generateProducts } from "./markups/productMarkup.js";
import { IBlog } from "../types/blogs.js";
import { generateBlogs } from "./markups/blogMarkup.js";

const hotProductsControl = document.querySelector('.hot_product .list_cate') as HTMLUListElement;
const hotProductContainer = document.querySelector('.list_prod') as HTMLDivElement;
const highlightCategoryContainer = document.querySelector('.random_cate .container') as HTMLDivElement;
const blogContainer = document.querySelector('.blog .blog_row') as HTMLDivElement;

function handleFilterProducts(products?: IProduct[]) {
    hotProductsControl.addEventListener('click', async function (e) {
        const control = e.target as HTMLLIElement;

        if (!control.hasAttribute('data-list')) return;

        hotProductsControl.querySelector('li.active')?.classList.remove('active');
        control.classList.add('active');

        if (control.dataset.list) {
            const clickedFilterId = control.dataset.list;
            const filteredProducts = products?.filter(product => product.categoryId === clickedFilterId);

            if (filteredProducts && clickedFilterId !== 'all')
                await generateProducts(hotProductContainer, filteredProducts);
            else {
                if (products)
                    await generateProducts(hotProductContainer, products.slice(0, 8));
            }
        }
    });
}

(async function () {
    const products: IProduct[] = await getFullData('products');
    const categories: ICategory[] = await getFullData('categories');
    const blogs: IBlog[] = await getFullData('blogs');

    await generateHighlightCategories(highlightCategoryContainer, categories.slice(0, 4));
    await generateProducts(hotProductContainer, products.slice(0, 8));
    await generateBlogs(blogContainer, blogs.slice(0, 3));
    handleFilterProducts(products);
})();
