import { getProducts } from "../api/apiProducts.js";
import { handleClickLike, handleToggleLike } from "./addLike.js";
import { updateHeader } from "./updateHeader.js";

export async function addToCart(curId, quantity = 1) {
    const { price } = await getProducts(curId);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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

    localStorage.setItem('cart', JSON.stringify(cart));

    updateHeader();
};

export function handleLikeAddCart() {
    document.querySelector('.list_prod').addEventListener('click', async function (e) {
        const btn = e.target;

        if (btn.hasAttribute('data-like')) {
            e.preventDefault();

            const curId = btn.dataset.like;
            handleToggleLike(btn);

            await handleClickLike(curId);
        }

        if (btn.hasAttribute('data-cart')) {
            e.preventDefault();

            const curId = btn.dataset.cart;

            await addToCart(curId);
        }
    });
}