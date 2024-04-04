import { getData } from "../api/apiData.js";
import { generatePagination, generateProducts } from "../site/markups/productMarkup.js";
import { IProduct } from "../types/products.js";
import { getCart, setCart } from "./helpers.js";
import updateHeader from "./updateHeader.js";

const productContainer = document.querySelector('.list_prod') as HTMLDivElement;

export interface ICartItem {
    id: string;
    quantity: number;
    price: number;
}

export async function addToCart(curId: string, quantity = 1) {
    const { price } = await getData('products', curId);

    const cart = getCart();
    let itemExists = false;

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        if (item.id === curId) {
            item.quantity += quantity;
            itemExists = true;
            break;
        }
    }

    if (!itemExists) {
        const newItem = {
            id: curId,
            quantity: quantity,
            price
        };
        cart.push(newItem);
    }

    setCart(cart);
    updateHeader();
};

export function handleLikeAddCart() {
    document.querySelector('.list_prod')!.addEventListener('click', async function (e) {
        const btn = e.target as HTMLElement;

        // if (btn.hasAttribute('data-like')) {
        //     e.preventDefault();

        //     const curId = btn.dataset.like;
        //     handleToggleLike(btn);

        //     await handleClickLike(curId);
        // }

        if (btn.hasAttribute('data-cart')) {
            e.preventDefault();

            const curId = btn.dataset.cart as string;

            await addToCart(curId);
        }
    });
}

export function handlePagination(container: HTMLDivElement, orgProducts: IProduct[]) {
    const perPage = 6;
    const totalPages = Math.ceil(orgProducts.length / perPage);

    generatePagination(container, totalPages);

    container.addEventListener('click', async function (e) {
        e.preventDefault();

        const btn = e.target as HTMLAnchorElement;

        if (!btn.hasAttribute('data-page')) return;

        e.preventDefault();

        const curPage = +btn.dataset.page!;
        const offset = curPage * perPage;
        const limit = offset + perPage;

        container.innerHTML = '';
        await generateProducts(productContainer, orgProducts.slice(offset, limit));
        generatePagination(container, totalPages, curPage);
    });
}