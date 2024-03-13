import { confirmLogin, registerUser } from "../api/apiUsers.js";

const familyName = document.querySelector("input[name=ho]");
const firstName = document.querySelector("input[name=ten]");
const email = document.querySelector("input[name=email]");
const phoneNum = document.querySelector("input[name=phone]");
const password = document.querySelector("input[name=password]");
const repass = document.querySelector("input[name=repass]");
const formLogin = document.querySelector("form.form-login");
const formRegister = document.querySelector("form.form-register");

function isError(input, message) {
    let siblingElem = input.nextElementSibling;
    input.classList.add("error");
    input.classList.add("placeHD");
    input.classList.remove("success");
    siblingElem.classList.add("error");
    siblingElem.innerText = message;
}

function isSuccess(input) {
    let siblingElem = input.nextElementSibling;
    input.classList.remove("error");
    input.classList.remove("placeHD");
    input.classList.add("success");
    siblingElem.classList.remove("error");
    siblingElem.innerText = "";
}

function checkName(input, type) {
    let isTrue = true;
    let nameReg = /-?\d+/;
    if (input.value === '') {
        isError(input, `(*) Vui lòng nhập ${type}!`);
        return false;
    } else if (nameReg.test(input.value.trim())) {
        isTrue = false;
        isError(input, `${type} không hợp lệ!`);
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkPhoneNumber(input) {
    let isTrue = true;
    let phoneNumReg = /^0\d{9}$/;
    if (input.value && !phoneNumReg.test(input.value)) {
        isError(input, "(*) Số điện thoại không hợp lệ!");
        isTrue = false;
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkEmail(input, cf = false) {
    let isTrue = true;
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value === '' && !cf) {
        isError(input, '(*) Vui lòng nhập email!');
        return false;
    } else if (!emailReg.test(input.value) && !cf) {
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

function checkPassword(input, cf) {
    let isTrue = true;
    if (input.value === '' && !cf) {
        isError(input, '(*) Vui lòng nhập mật khẩu!');
        return false;
    } else if (input.value.length < 5 && !cf) {
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

function checkCfPassword(pw, cfpw) {
    let isTrue = true;
    if (cfpw.value === '') {
        isError(cfpw, '(*) Vui lòng xác nhận mật khẩu!');
        return false;
    } else if (pw.value !== cfpw.value) {
        isError(cfpw, '(*) Mật khẩu không trùng khớp!');
        isTrue = false;
    } else {
        isSuccess(cfpw);
    }
    return isTrue;
}

formLogin && formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!(checkEmail(email) && checkPassword(password))) {
        checkEmail(email);
        checkPassword(password);
    } else {
        const result = await confirmLogin(email.value, password.value);

        if (result === 0) checkEmail(email, true);

        if (result === 1) window.location.href = 'admin.html';

        if (result === 2) checkPassword(password, true);

        if (result.id) {
            localStorage.setItem('isLogin', `${result.id}`);
            window.location.href = 'index.html';
        }
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
        const form = new FormData(formRegister);
        const formData = Object.fromEntries(form);

        await registerUser({
            role: "2",
            name: formData.ho + ' ' + formData.ten,
            phoneNumber: formData.phone,
            email: formData.email,
            address: formData.address,
            password: formData.repass
        });

        alert('Đăng ký tài khoản thành công.');
    }
});


