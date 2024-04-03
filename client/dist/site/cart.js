var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formatPrice } from "../utils/helpers.js";
import { getCart, setCart } from "../utils/productHandler.js";
import updateHeader from "../utils/updateHeader.js";
import { emptyCart, generateCart } from "./markups/cartMarkup.js";
const cartWrapper = document.querySelector('.wrapper');
function removeItemCart() {
    document.querySelector('table.tb-cart tbody').addEventListener('click', function (e) {
        const deleteBtn = e.target;
        if (!deleteBtn.hasAttribute('data-id'))
            return;
        const deleteId = deleteBtn.dataset.id;
        const cartData = getCart();
        const newCart = cartData.filter(item => item.id != deleteId);
        setCart(newCart);
        document.querySelector(`tbody tr:is(:has(.fa-times[data-id="${deleteId}"]))`).remove();
        updateHeader();
        updateBillCart();
        if (!newCart.length)
            emptyCart(cartWrapper);
    });
}
function adjustQuantityItem(btn, isInc) {
    const itemId = btn.dataset[isInc ? 'inc' : 'dec'];
    const inputElement = btn.parentNode.querySelector('input');
    const currentQuantity = +inputElement.value;
    if (!isInc && inputElement && Number(inputElement.value) < 2)
        return;
    const cartData = getCart();
    const newCart = cartData.map(item => item.id == itemId ? Object.assign(Object.assign({}, item), { quantity: isInc ? item.quantity + 1 : item.quantity - 1 }) : item);
    const trElement = btn.closest('tr');
    const priceEl = trElement.querySelector('.cart_price');
    const price = +priceEl.dataset.price;
    const totalLabel = trElement.querySelector('.cart_total');
    totalLabel.innerText = formatPrice(price * (isInc ? currentQuantity + 1 : currentQuantity - 1));
    setCart(newCart);
    inputElement.value = isInc ? `${currentQuantity + 1}` : `${currentQuantity - 1}`;
    updateHeader();
    updateBillCart();
}
function handleClickQuantity() {
    document.querySelector('table.tb-cart tbody').addEventListener('click', function (e) {
        const btn = e.target;
        if (btn.hasAttribute('data-inc')) {
            adjustQuantityItem(btn, true);
        }
        else if (btn.hasAttribute('data-dec')) {
            adjustQuantityItem(btn, false);
        }
    });
}
function handleChangeQuantity() {
    document.querySelector('table.tb-cart tbody').addEventListener('change', function (e) {
        const inputElement = e.target;
        if (inputElement.tagName === 'INPUT') {
            const trElement = inputElement.closest('tr');
            const priceEl = trElement.querySelector('.cart_price');
            const price = +priceEl.dataset.price;
            const totalLabel = trElement.querySelector('.cart_total');
            const currentQuantity = +inputElement.value;
            const itemId = inputElement.dataset.ip;
            const cartData = getCart();
            const newCart = cartData.map(item => item.id === itemId ? Object.assign(Object.assign({}, item), { quantity: currentQuantity }) : item);
            totalLabel.innerText = formatPrice(price * currentQuantity);
            setCart(newCart);
            updateHeader();
            updateBillCart();
        }
    });
}
export function updateBillCart() {
    const cartData = getCart();
    const totalPrice = cartData.reduce((acc, cur) => acc += +cur.price * cur.quantity, 0);
    const cartBillPrice = document.querySelector('.total_bill');
    cartBillPrice.innerText = formatPrice(totalPrice);
}
(function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const isNotEmpty = yield generateCart(cartWrapper, getCart());
        if (!isNotEmpty)
            return;
        removeItemCart();
        handleClickQuantity();
        handleChangeQuantity();
        updateBillCart();
    });
})();
