import { formatPrice } from "../utils/helpers.js";
import { ICartItem, getCart, setCart } from "../utils/productHandler.js";
import updateHeader from "../utils/updateHeader.js";
import { emptyCart, generateCart } from "./markups/cartMarkup.js";

const cartWrapper = document.querySelector('.wrapper') as HTMLDivElement;

function removeItemCart() {
    document.querySelector('table.tb-cart tbody')!.addEventListener('click', function (e) {
        const deleteBtn = e.target as HTMLElement;

        if (!deleteBtn.hasAttribute('data-id')) return;

        const deleteId = deleteBtn.dataset.id;

        const cartData: ICartItem[] = getCart();

        const newCart = cartData.filter(item => item.id != deleteId);

        setCart(newCart);

        document.querySelector(`tbody tr:is(:has(.fa-times[data-id="${deleteId}"]))`)!.remove();

        updateHeader();
        updateBillCart();

        if (!newCart.length) emptyCart(cartWrapper);
    });
}

function adjustQuantityItem(btn: HTMLElement, isInc: boolean) {
    const itemId = btn.dataset[isInc ? 'inc' : 'dec'];
    const inputElement = btn.parentNode!.querySelector('input');
    const currentQuantity = +inputElement!.value;

    if (!isInc && inputElement && Number(inputElement.value) < 2) return;

    const cartData: ICartItem[] = getCart();
    const newCart = cartData.map(item =>
        item.id == itemId ? { ...item, quantity: isInc ? item.quantity + 1 : item.quantity - 1 } : item
    );

    const trElement = btn.closest('tr') as HTMLTableRowElement;
    const priceEl = trElement.querySelector('.cart_price') as HTMLElement;
    const price = +priceEl.dataset.price!;
    const totalLabel = trElement.querySelector('.cart_total') as HTMLElement;

    totalLabel.innerText = formatPrice(price * (isInc ? currentQuantity + 1 : currentQuantity - 1));
    setCart(newCart);
    inputElement!.value = isInc ? `${currentQuantity + 1}` : `${currentQuantity - 1}`;

    updateHeader();
    updateBillCart();
}

function handleClickQuantity() {
    document.querySelector('table.tb-cart tbody')!.addEventListener('click', function (e) {
        const btn = e.target as HTMLElement;

        if (btn.hasAttribute('data-inc')) {
            adjustQuantityItem(btn, true);
        } else if (btn.hasAttribute('data-dec')) {
            adjustQuantityItem(btn, false);
        }
    });

}

function handleChangeQuantity() {
    document.querySelector('table.tb-cart tbody')!.addEventListener('change', function (e) {
        const inputElement = e.target as HTMLInputElement;

        if (inputElement.tagName === 'INPUT') {
            const trElement = inputElement.closest('tr')!;
            const priceEl = trElement.querySelector('.cart_price') as HTMLElement;
            const price = +priceEl.dataset.price!;
            const totalLabel = trElement.querySelector('.cart_total') as HTMLElement;
            const currentQuantity = +inputElement.value;

            const itemId = inputElement.dataset.ip!;
            const cartData: ICartItem[] = getCart();
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

export function updateBillCart() {
    const cartData: ICartItem[] = getCart();

    const totalPrice = cartData.reduce((acc, cur) => acc += +cur.price * cur.quantity, 0);

    const cartBillPrice = document.querySelector('.total_bill') as HTMLElement;
    cartBillPrice.innerText = formatPrice(totalPrice);
}

(async function init() {
    const isNotEmpty = await generateCart(cartWrapper, getCart());

    if (!isNotEmpty) return;

    removeItemCart();
    handleClickQuantity();
    handleChangeQuantity();
    updateBillCart();
})();