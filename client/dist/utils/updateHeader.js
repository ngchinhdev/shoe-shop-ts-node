import { formatPrice } from "./helpers.js";
const quantityCartHeader = document.querySelector('.cart_site li:nth-child(2) span');
const priceCartHeader = document.querySelector('.cart_site li:nth-child(3) b');
function updateQuantityCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    quantityCartHeader.innerText = (cartData.length > 99 ? '99+' : cartData.length) || 0;
    return cartData;
}
function updateTotalPriceCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cartData.reduce((acc, cur) => acc += +cur.price * cur.quantity, 0);
    priceCartHeader.innerText = formatPrice(totalPrice) || formatPrice(0);
    return cartData;
}
export default function updateHeader() {
    updateQuantityCartHeader();
    updateTotalPriceCartHeader();
}
