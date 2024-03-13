import { emptyCart, generateCart, updateBillCart } from "./markups/cartMarkup.js";
import { formatPrice } from "../utils/formatPrice.js";
import { updateHeader } from "../utils/updateHeader.js";

const cartWrapper = document.querySelector('.wrapper');

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function removeItemCart() {
    document.querySelector('table.tb-cart tbody').addEventListener('click', function (e) {
        const deleteBtn = e.target;

        if (!deleteBtn.hasAttribute('data-id')) return;

        const deleteId = deleteBtn.dataset.id;

        const cartData = getCart();

        const newCart = cartData.filter(item => item.id != deleteId);

        setCart(newCart);

        document.querySelector(`tbody tr:is(:has(.fa-times[data-id="${deleteId}"]))`).remove();

        updateHeader();
        updateBillCart();

        if (!newCart.length) emptyCart(cartWrapper);
    });
}

function adjustQuantityItem(btn, isInc) {
    const itemId = btn.dataset[isInc ? 'inc' : 'dec'];
    const inputElement = btn.parentNode.querySelector('input');
    const currentQuantity = +inputElement.value;

    if (!isInc && inputElement.value < 2) return;

    const cartData = getCart();
    const newCart = cartData.map(item =>
        item.id == itemId ? { ...item, quantity: isInc ? item.quantity + 1 : item.quantity - 1 } : item
    );

    const trElement = btn.closest('tr');
    const price = +trElement.querySelector('.cart_price').dataset.price;
    const totalLabel = trElement.querySelector('.cart_total');

    totalLabel.innerText = formatPrice(price * (isInc ? currentQuantity + 1 : currentQuantity - 1));
    setCart(newCart);
    inputElement.value = isInc ? currentQuantity + 1 : currentQuantity - 1;

    updateHeader();
    updateBillCart();
}

function handleClickQuantity() {
    document.querySelector('table.tb-cart tbody').addEventListener('click', function (e) {
        const btn = e.target;

        if (btn.hasAttribute('data-inc')) {
            adjustQuantityItem(btn, true);
        } else if (btn.hasAttribute('data-dec')) {
            adjustQuantityItem(btn, false);
        }
    });

}

function handleChangeQuantity() {
    document.querySelector('table.tb-cart tbody').addEventListener('change', function (e) {
        const inputElement = e.target;

        if (inputElement.tagName === 'INPUT') {
            const trElement = inputElement.closest('tr');
            const price = +trElement.querySelector('.cart_price').dataset.price;
            const totalLabel = trElement.querySelector('.cart_total');
            const currentQuantity = +inputElement.value;

            const itemId = +inputElement.dataset.ip;
            const cartData = getCart();
            const newCart = cartData.map(item =>
                item.id === itemId ? { ...item, quantity: currentQuantity } : item
            );

            totalLabel.innerText = formatPrice(price * currentQuantity);
            setCart(newCart);

            updateHeader();
            updateBillCart();
        }
    });
}

async function init() {
    const isNotEmpty = await generateCart(cartWrapper);

    if (!isNotEmpty) return;

    removeItemCart();
    handleClickQuantity();
    handleChangeQuantity();
    updateBillCart();
}

init();