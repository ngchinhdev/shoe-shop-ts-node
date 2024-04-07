import { getFullData } from "../api/apiData.js";
import { IProduct } from "../types/products.js";
import { handleLikeAddCart, handlePagination } from "../utils/productHandler.js";
import { generateProducts } from "./markups/productMarkup.js";

export const shopProductContainer = document.querySelector('.list_prod') as HTMLDivElement;
const paginationContainer = document.querySelector('.product_pagination') as HTMLDivElement;
const totalResultLabel = document.querySelector('.total_results') as HTMLSpanElement;

export function updateTotalResults(value: number) {
    totalResultLabel.innerText = `${value} Kết quả`;
}

const filterAndSort = async (products: IProduct[]) => {
    const filterPriceCheckboxes = document.querySelectorAll('.price_checkbox:checked') as NodeListOf<HTMLInputElement>;
    const filterDiscountCheckboxes = document.querySelectorAll('.discount_checkbox:checked') as NodeListOf<HTMLInputElement>;
    const filterSelectOptions = document.querySelector('.filter select') as HTMLSelectElement;

    const productFiltered = products.filter(product => {
        const priceCondition = Array.from(filterPriceCheckboxes).some(checkbox => {
            const rangePrice = checkbox.value.split('-');

            const minPrice = +rangePrice[0];
            const maxPrice = +rangePrice[1] || Infinity;

            return product.price! >= minPrice && product.price! <= maxPrice;
        });

        const discountCondition = Array.from(filterDiscountCheckboxes).some(checkbox => {
            const rangeDiscount = checkbox.value.split('-');

            const minDiscount = +rangeDiscount[0];
            const maxDiscount = +rangeDiscount[1] || Infinity;

            const discount = product.orgPrice ? 100 - +(product.price! / product.orgPrice * 100) : 0;

            return discount >= minDiscount && discount <= maxDiscount;
        });

        return (!filterPriceCheckboxes.length || priceCondition) && (!filterDiscountCheckboxes.length || discountCondition);
    });

    if (filterSelectOptions.value === 'inc') {
        productFiltered.sort(function (a, b) {
            return a.price! - b.price!;
        });
    } else if (filterSelectOptions.value === 'dec') {
        productFiltered.sort(function (a, b) {
            return b.price! - a.price!;
        });
    }

    updateTotalResults(productFiltered.length);
    handlePagination(paginationContainer, productFiltered);
    await generateProducts(shopProductContainer, productFiltered.slice(0, 6));
};

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

        if (!categoryQuery && !searchQuery) {
            products = await getFullData(`products`);
        }

        updateTotalResults(products.length);
        await generateProducts(shopProductContainer, products?.slice(0, 6));
        handlePagination(paginationContainer, products);
        handleLikeAddCart();

        const filterCondition = document.querySelectorAll('.price_checkbox, .discount_checkbox') as NodeListOf<HTMLInputElement>;
        const filterSelect = document.querySelector('.filter select') as HTMLSelectElement;

        filterCondition.forEach(checkbox => {
            checkbox.addEventListener('change', () => filterAndSort(products));
        });
        filterSelect.addEventListener('change', () => filterAndSort(products));
    } catch (error) {
        console.error(error);
        return;
    }
})();
