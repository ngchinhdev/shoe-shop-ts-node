import { postData } from "../api/apiData.js";
import Cookies from '../../node_modules/js-cookie/dist/js.cookie.mjs';

const familyName = document.querySelector("input[name=ho]") as HTMLInputElement;
const firstName = document.querySelector("input[name=ten]") as HTMLInputElement;
const email = document.querySelector("input[name=email]") as HTMLInputElement;
const phoneNum = document.querySelector("input[name=phone]") as HTMLInputElement;
const password = document.querySelector("input[name=password]") as HTMLInputElement;
const repass = document.querySelector("input[name=repass]") as HTMLInputElement;
const addressInput = document.querySelector("input[name=address]") as HTMLInputElement;
const formLogin = document.querySelector("form.form-login") as HTMLFormElement;
const formRegister = document.querySelector("form.form-register") as HTMLFormElement;

function isError(input: HTMLInputElement, message: string) {
    const siblingEl = input.nextElementSibling as HTMLElement;

    input.classList.add("error");
    input.classList.add("placeHD");
    input.classList.remove("success");

    if (siblingEl) {
        siblingEl?.classList.add("error");
        siblingEl.innerText = message;
    }
}

function isSuccess(input: HTMLInputElement) {
    const siblingEl = input.nextElementSibling as HTMLElement;

    input.classList.remove("error");
    input.classList.remove("placeHD");
    input.classList.add("success");

    if (siblingEl) {
        siblingEl.classList.remove("error");
        siblingEl.innerText = "";
    }
}

function checkName(input: HTMLInputElement, type: string) {
    let isTrue = true;
    let nameReg = /-?\d+/;
    if (input.value.trim() === '') {
        isError(input, `(*) Vui lòng nhập ${type}!`);
        return false;
    } else if (nameReg.test(input.value.trim().trim())) {
        isTrue = false;
        isError(input, `${type} không hợp lệ!`);
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkPhoneNumber(input: HTMLInputElement) {
    let isTrue = true;
    let phoneNumReg = /^0\d{9}$/;
    if (input.value.trim() && !phoneNumReg.test(input.value.trim())) {
        isError(input, "(*) Số điện thoại không hợp lệ!");
        isTrue = false;
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkEmail(input: HTMLInputElement, cf = false) {
    let isTrue = true;
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value.trim() === '' && !cf) {
        isError(input, '(*) Vui lòng nhập email!');
        return false;
    } else if (!emailReg.test(input.value.trim()) && !cf) {
        isError(input, "(*) Email không hợp lệ!");
        isTrue = false;
    } else if (cf) {
        isError(input, "(*) Email không tồn tại!");
        isTrue = false;
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkPassword(input: HTMLInputElement, cf = false) {
    let isTrue = true;
    if (input.value.trim() === '' && !cf) {
        isError(input, '(*) Vui lòng nhập mật khẩu!');
        return false;
    } else if (input.value.trim().length < 5 && !cf) {
        isError(input, '(*) Vui lòng nhập nhiều hơn 5 ký tự!');
        isTrue = false;
    } else if (cf) {
        isError(input, '(*) Mật khẩu không đúng');
        isTrue = false;
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkCfPassword(pwInput: HTMLInputElement, cfpwInput: HTMLInputElement) {
    let isTrue = true;
    if (cfpwInput.value.trim() === '') {
        isError(cfpwInput, '(*) Vui lòng xác nhận mật khẩu!');
        return false;
    } else if (pwInput.value.trim() !== cfpwInput.value.trim()) {
        isError(cfpwInput, '(*) Mật khẩu không trùng khớp!');
        isTrue = false;
    } else {
        isSuccess(cfpwInput);
    }
    return isTrue;
}

formLogin && formLogin.addEventListener('submit', async function (e: SubmitEvent) {
    e.preventDefault();

    if (!(checkEmail(email) && checkPassword(password))) {
        checkEmail(email);
        checkPassword(password);
    } else {
        const dataUser = await postData('auth/login', new FormData(formLogin));

        Cookies.set(
            'accessToken',
            dataUser.accessToken,
            { expires: new Date().setTime(new Date().getTime() + 15 * 60 * 1000) }
        );

        localStorage.setItem('accessToken', dataUser.accessToken);
    }
});

formRegister && formRegister.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!(checkEmail(email) && checkPassword(password) && checkPhoneNumber(phoneNum) &&
        checkName(familyName, "Họ") && checkName(firstName, "Tên") && checkCfPassword(password, repass))) {
        checkEmail(email);
        checkPassword(password);
        checkPhoneNumber(phoneNum);
        checkName(familyName, "Họ");
        checkName(firstName, "Tên");
        checkCfPassword(password, repass);
    } else {
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

        await postData('auth/register', formPost);

        alert('Đăng ký tài khoản thành công.');
    }
});


