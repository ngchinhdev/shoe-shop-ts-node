var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData, postData } from "../api/apiData.js";
const familyName = document.querySelector("input[name=ho]");
const firstName = document.querySelector("input[name=ten]");
const email = document.querySelector("input[name=email]");
const phoneNum = document.querySelector("input[name=phone]");
const password = document.querySelector("input[name=password]");
const repass = document.querySelector("input[name=repass]");
const addressInput = document.querySelector("input[name=address]");
const formLogin = document.querySelector("form.form-login");
const formRegister = document.querySelector("form.form-register");
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
function checkName(input, type) {
    let isTrue = true;
    let nameReg = /-?\d+/;
    if (input.value.trim() === '') {
        isError(input, `(*) Vui lòng nhập ${type}!`);
        return false;
    }
    else if (nameReg.test(input.value.trim().trim())) {
        isTrue = false;
        isError(input, `${type} không hợp lệ!`);
    }
    else {
        isSuccess(input);
    }
    return isTrue;
}
function checkPhoneNumber(input) {
    let isTrue = true;
    let phoneNumReg = /^0\d{9}$/;
    if (input.value.trim() && !phoneNumReg.test(input.value.trim())) {
        isError(input, "(*) Số điện thoại không hợp lệ!");
        isTrue = false;
    }
    else {
        isSuccess(input);
    }
    return isTrue;
}
function checkEmail(input, cf = false) {
    let isTrue = true;
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value.trim() === '' && !cf) {
        isError(input, '(*) Vui lòng nhập email!');
        return false;
    }
    else if (!emailReg.test(input.value.trim()) && !cf) {
        isError(input, "(*) Email không hợp lệ!");
        isTrue = false;
    }
    else if (cf) {
        isError(input, "(*) Email không tồn tại!");
        isTrue = false;
    }
    else {
        isSuccess(input);
    }
    return isTrue;
}
function checkPassword(input, cf = false) {
    let isTrue = true;
    if (input.value.trim() === '' && !cf) {
        isError(input, '(*) Vui lòng nhập mật khẩu!');
        return false;
    }
    else if (input.value.trim().length < 5 && !cf) {
        isError(input, '(*) Vui lòng nhập nhiều hơn 5 ký tự!');
        isTrue = false;
    }
    else if (cf) {
        isError(input, '(*) Mật khẩu không đúng');
        isTrue = false;
    }
    else {
        isSuccess(input);
    }
    return isTrue;
}
function checkCfPassword(pwInput, cfpwInput) {
    let isTrue = true;
    if (cfpwInput.value.trim() === '') {
        isError(cfpwInput, '(*) Vui lòng xác nhận mật khẩu!');
        return false;
    }
    else if (pwInput.value.trim() !== cfpwInput.value.trim()) {
        isError(cfpwInput, '(*) Mật khẩu không trùng khớp!');
        isTrue = false;
    }
    else {
        isSuccess(cfpwInput);
    }
    return isTrue;
}
const confirmLogin = (enteredEmail, enteredPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getData('users/email', enteredEmail.trim());
    console.log(user);
    if (!user) {
        checkEmail(email, true);
        return false;
    }
    if (user[0].password !== enteredPassword) {
        checkPassword(password, true);
        return false;
    }
    if (user[0].isAdmin) {
        window.location.href = '../../public/admin/admin.html';
    }
    alert('Đăng nhập thành công.');
    return true;
});
formLogin && formLogin.addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!(checkEmail(email) && checkPassword(password))) {
            checkEmail(email);
            checkPassword(password);
        }
        else {
            yield confirmLogin(email.value, password.value);
        }
    });
});
formRegister && formRegister.addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!(checkEmail(email) && checkPassword(password) && checkPhoneNumber(phoneNum) &&
            checkName(familyName, "Họ") && checkName(firstName, "Tên") && checkCfPassword(password, repass))) {
            checkEmail(email);
            checkPassword(password);
            checkPhoneNumber(phoneNum);
            checkName(familyName, "Họ");
            checkName(firstName, "Tên");
            checkCfPassword(password, repass);
        }
        else {
            const formPost = new FormData();
            const fullNameValue = `${familyName.value} ${firstName.value}`;
            const phoneValue = phoneNum.value;
            const emailValue = email.value;
            const addressValue = addressInput.value.trim();
            const passwordValue = password.value;
            formPost.append('fullName', fullNameValue);
            formPost.append('phone', phoneValue);
            formPost.append('email', emailValue);
            formPost.append('address', addressValue);
            formPost.append('password', passwordValue);
            yield postData('users', formPost);
            alert('Đăng ký tài khoản thành công.');
        }
    });
});