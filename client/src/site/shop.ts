import { getFullData } from "../api/apiData.js";
import { IProduct } from "../types/products.js";
import { handleLikeAddCart, handlePagination } from "../utils/productHandler.js";
import { generateProducts } from "./markups/productMarkup.js";

export const shopProductContainer = document.querySelector('.list_prod') as HTMLDivElement;
const paginationContainer = document.querySelector('.product_pagination') as HTMLDivElement;
const totalResultLabel = document.querySelector('.total_results') as HTMLSpanElement;
const filterSelectOptions = document.querySelector('.filter select') as HTMLSelectElement;
const filterPrice = document.querySelector('.price.filter_side') as HTMLDivElement;
const filterDiscount = document.querySelector('.discount.filter_side') as HTMLDivElement;

let filterOption: string = '';
let sortOption: string = '';

export function updateTotalResults(value: number) {
    totalResultLabel.innerText = `${value} Kết quả`;
}

const getFilterProducts = async () => {
    const products = await getFullData(`products/filter?${filterOption}&sort=${sortOption}`);

    await generateProducts(shopProductContainer, products.slice(0, 6));
};

filterSelectOptions.addEventListener('change', async function () {
    paginationContainer.innerHTML = '';

    const type = filterSelectOptions.value;

    if (type === 'inc') {
        sortOption = 'inc';
    }

    if (type === 'dec') {
        sortOption = 'dec';
    }

    if (type === 'all') {
        sortOption = 'all';
    }

    getFilterProducts();
});

filterPrice.addEventListener('change', async function (e) {
    paginationContainer.innerHTML = '';

    const checkbox = e.target as HTMLInputElement;

    if (!checkbox.classList.contains('price_checkbox')) return;

    const checkboxValue = JSON.parse(checkbox.value.replace(/'/g, '"'));

    let noChecked = false;

    // if (!checkbox.checked) {
    //     if (checkboxValue[0] === 'under') {
    //         products = filteredProducts.filter(product => product.price > +checkboxValue[1]);
    //     }

    //     if (checkboxValue[0] === 'above') {
    //         products = filteredProducts.filter(product => product.price < +checkboxValue[1]);
    //     }

    //     if (!isNaN(+checkboxValue[0])) {
    //         products = filteredProducts.filter(product => product.price < +checkboxValue[0] || product.price >= +checkboxValue[1]);
    //     }
    // }

    if (checkbox.checked) {
        if (checkboxValue[0] === 'under') {
            if (filterOption.includes('bottomPrice')) {
                filterOption = filterOption.replace(/bottomPrice=\d+/g, `bottomPrice=0`);
            }
            filterOption += `&bottomPrice=0&topPrice=${checkboxValue[1]}`;
        }

        if (checkboxValue[0] === 'above') {
            filterOption += `&topPrice=1000000000&bottomPrice=${checkboxValue[1]}`;
        }

        if (!isNaN(+checkboxValue[0])) {
            filterOption += `&bottomPrice=${checkboxValue[0]}&topPrice=${checkboxValue[1]}`;
        }
    }

    getFilterProducts();
});

filterDiscount.addEventListener('change', async function (e) {
    paginationContainer.innerHTML = '';

    const checkbox = e.target as HTMLInputElement;

    if (!checkbox.classList.contains('discount_checkbox')) return;

    const checkboxValue = JSON.parse(checkbox.value.replace(/'/g, '"'));

    let noChecked = false;


    // if (!checkbox.checked) {
    //     if (checkboxValue[0] === 'under') {
    //         products = filteredProducts.filter(product => 100 - (product.price / product.orgPrice * 100) > +checkboxValue[1]);
    //     }

    //     if (checkboxValue[0] === 'above') {
    //         products = filteredProducts.filter(product => 100 - (product.price / product.orgPrice * 100) < +checkboxValue[1]);
    //     }

    //     if (!isNaN(+checkboxValue[0])) {
    //         products = filteredProducts.filter(product => 100 - (product.price / product.orgPrice * 100) < +checkboxValue[0] || 100 - (product.price / product.orgPrice * 100) >= +checkboxValue[1]);
    //     }

    //     const allCheckbox = document.querySelectorAll('.price_checkbox');
    //     noChecked = [...allCheckbox].every(checkbox => !checkbox.checked);
    //     if (noChecked) products = orgProducts;
    // }

    if (checkbox.checked) {
        if (checkboxValue[0] === 'under') {
            filterOption += `&bottomDiscount=0&topDiscount=${checkboxValue[1]}`;
        }

        if (checkboxValue[0] === 'above') {
            filterOption += `&topDiscount=100&bottomDiscount=${checkboxValue[1]}`;
        }

        if (!isNaN(+checkboxValue[0])) {
            filterOption += `&bottomDiscount=${checkboxValue[0]}&topDiscount=${checkboxValue[1]}`;
        }
    }

    getFilterProducts();
});

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
            products = await getFullData(`products?${filterOption}&sort=${sortOption}`);
        }

        await generateProducts(shopProductContainer, products.slice(0, 6));
        handlePagination(paginationContainer, products);
        handleLikeAddCart();
    } catch (error) {
        console.error(error);
    }
})();
