import { getData, postData } from "../api/apiData.js";
import { IProduct } from "../types/products.js";
import { getCart } from "../utils/helpers.js";
import { ICartItem } from "../utils/productHandler.js";
import { generateProductToPay } from "./markups/checkoutMarkup.js";

const fullName = document.querySelector(".name") as HTMLInputElement;
const phoneNum = document.querySelector(".phone_num") as HTMLInputElement;
const email = document.querySelector("input.email") as HTMLInputElement;
const address = document.querySelector(".address") as HTMLInputElement;
const form = document.querySelector("form") as HTMLFormElement;

function isError(input: HTMLInputElement | HTMLSelectElement, message: string) {
    const siblingEl = input.nextElementSibling as HTMLElement;

    input.classList.add("error");
    input.classList.add("placeHD");
    input.classList.remove("success");

    if (siblingEl) {
        siblingEl?.classList.add("error");
        siblingEl.innerText = message;
    }
}

function isSuccess(input: HTMLInputElement | HTMLSelectElement) {
    const siblingEl = input.nextElementSibling as HTMLElement;

    input.classList.remove("error");
    input.classList.remove("placeHD");
    input.classList.add("success");

    if (siblingEl) {
        siblingEl.classList.remove("error");
        siblingEl.innerText = "";
    }
}

function checkName(input: HTMLInputElement) {
    let isEmty = true;
    let nameReg = /-?\d+/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập tên!');
        return false;
    } else if (nameReg.test(input.value.trim())) {
        isEmty = false;
        isError(input, "Tên không hợp lệ!");
    } else {
        isSuccess(input);
    }
    return isEmty;
}

function checkPhoneNumber(input: HTMLInputElement) {
    let isEmty = true;
    let phoneNumReg = /^0\d{9}$/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập số điện thoại!');
        return false;
    } else if (!phoneNumReg.test(input.value)) {
        isError(input, "Số điện thoại không hợp lệ!");
        isEmty = false;
    } else {
        isSuccess(input);
    }
    return isEmty;
}

function checkEmail(input: HTMLInputElement) {
    let isEmty = true;
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập email!');
        return false;
    } else if (!emailReg.test(input.value)) {
        isError(input, "Email không hợp lệ!");
        isEmty = false;
    } else {
        isSuccess(input);
    }
    return isEmty;
}

function checkAddress(input: HTMLInputElement) {
    let isEmty = true;
    if (input.value == "") {
        isError(address, "Vui lòng nhập địa chỉ!");
        isEmty = false;
    } else {
        isSuccess(address);
    }
    return isEmty;
}


// Show products to pay
const params = new URLSearchParams(window.location.search);
const idProd = params.get('id');
const quantity = params.get('quantity');

const productContainer = document.querySelector('.sum_rows') as HTMLDivElement;
let productsToPay: (IProduct & { quantityPay: string; })[] = [];

(async function getProductsToPay() {
    if (idProd && quantity) {
        const product = await getData('products/', idProd);

        productsToPay = [{ ...product, quantityPay: quantity }];
        await generateProductToPay([{ ...product, quantityPay: quantity }], productContainer);
    } else {
        const cartData: ICartItem[] = getCart();

        const promises = cartData.map(async cart => {
            const product = await getData('products/', cart.id);

            return { ...product, quantityPay: cart.quantity };
        });

        let productCarts = await Promise.all(promises);

        productsToPay = productCarts;
        await generateProductToPay(productCarts, productContainer);
    }

    return productsToPay;
})();

form.onsubmit = async function (e) {
    e.preventDefault();
    if (!(checkName(fullName) && checkPhoneNumber(phoneNum) && checkEmail(email) &&
        checkAddress(address))) {
        checkName(fullName);
        checkPhoneNumber(phoneNum);
        checkEmail(email);
        checkAddress(address);
    } else {
        const items = productsToPay.map(product => ({
            product: product._id,
            quantity: +product.quantityPay
        }));

        const formOrder = new FormData(form);

        const userId = localStorage.getItem('id');

        formOrder.append('items', JSON.stringify(items));

        if (userId) {
            formOrder.append('userId', userId);
        }
        await postData('orders', formOrder);

        alert('Đặt hàng thành công!');

        localStorage.removeItem('cart');

        window.location.href = '../site/success-payment.html';
    }
};
