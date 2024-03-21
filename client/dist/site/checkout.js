"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fullName = document.querySelector(".name");
const phoneNum = document.querySelector(".phone_num");
const email = document.querySelector("input.email");
const address = document.querySelector(".address");
const provinces = document.querySelector(".provinces");
const form = document.querySelector("form");
function isError(input, message) {
    const siblingEl = input.nextElementSibling;
    input.classList.add("error");
    input.classList.add("placeHD");
    input.classList.remove("success");
    if (siblingEl) {
        siblingEl === null || siblingEl === void 0 ? void 0 : siblingEl.classList.add("error");
        siblingEl.innerText = message;
    }
}
function isSuccess(input) {
    const siblingEl = input.nextElementSibling;
    input.classList.remove("error");
    input.classList.remove("placeHD");
    input.classList.add("success");
    if (siblingEl) {
        siblingEl.classList.remove("error");
        siblingEl.innerText = "";
    }
}
function checkName(input) {
    let isEmty = true;
    let nameReg = /-?\d+/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập tên!');
        return false;
    }
    else if (nameReg.test(input.value.trim())) {
        isEmty = false;
        isError(input, "Tên không hợp lệ!");
    }
    else {
        isSuccess(input);
    }
    return isEmty;
}
function checkPhoneNumber(input) {
    let isEmty = true;
    let phoneNumReg = /^0\d{9}$/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập số điện thoại!');
        return false;
    }
    else if (!phoneNumReg.test(input.value)) {
        isError(input, "Số điện thoại không hợp lệ!");
        isEmty = false;
    }
    else {
        isSuccess(input);
    }
    return isEmty;
}
function checkEmail(input) {
    let isEmty = true;
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập email!');
        return false;
    }
    else if (!emailReg.test(input.value)) {
        isError(input, "Email không hợp lệ!");
        isEmty = false;
    }
    else {
        isSuccess(input);
    }
    return isEmty;
}
function checkAddress(input) {
    let isEmty = true;
    if (input.value == "") {
        isError(address, "Vui lòng nhập địa chỉ!");
        isEmty = false;
    }
    else {
        isSuccess(address);
    }
    return isEmty;
}
function checkProvinces(input) {
    let isEmty = true;
    if (input.value === "Tỉnh / Thành phố") {
        input.classList.add("error");
        isEmty = false;
        isError(input, "Vui lòng chọn tỉnh thành!");
    }
    else {
        input.classList.add("success");
        isSuccess(input);
    }
    return isEmty;
}
form.onsubmit = function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!(checkName(fullName) && checkPhoneNumber(phoneNum) && checkEmail(email) &&
            checkAddress(address) && checkProvinces(provinces))) {
            checkName(fullName);
            checkPhoneNumber(phoneNum);
            checkEmail(email);
            checkAddress(address);
            checkProvinces(provinces);
        }
    });
};
