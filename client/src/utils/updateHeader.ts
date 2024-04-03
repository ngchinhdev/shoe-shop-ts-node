import { formatPrice } from "./helpers.js";

const quantityCartHeader = document.querySelector('.cart_site li:nth-child(2) span') as HTMLSpanElement;
const priceCartHeader = document.querySelector('.cart_site li:nth-child(3) b') as HTMLElement;

function updateQuantityCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')!) || [];

    quantityCartHeader.innerText = (cartData.length > 99 ? '99+' : cartData.length) || 0;

    return cartData;
}

function updateTotalPriceCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')!) || [];

    const totalPrice = cartData.reduce((acc: number, cur: any) => acc += +cur.price * cur.quantity, 0);
    priceCartHeader.innerText = formatPrice(totalPrice) || formatPrice(0);

    return cartData;
}

export default function updateHeader() {
    updateQuantityCartHeader();
    updateTotalPriceCartHeader();
}
