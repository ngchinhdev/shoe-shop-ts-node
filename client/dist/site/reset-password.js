var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { postData } from "../api/apiData.js";
const email = document.querySelector("input[name=email]");
const formEmail = document.querySelector("form.form-email");
const formCode = document.querySelector("form.form-code");
const formNewPass = document.querySelector("form.form-newpass");
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
formEmail && formEmail.addEventListener('submit', function (e) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!(checkEmail(email))) {
            checkEmail(email);
        }
        else {
            const dataUser = yield postData('auth/sendmail', new FormData(formEmail));
            if (!dataUser) {
                checkEmail(email, true);
                return;
            }
            if (dataUser.statusCode === 200) {
                alert('Vui lòng kiểm tra email để đặt lại mật khẩu!');
                formEmail.classList.add('hide');
                (_a = document.querySelector('.form-code')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
            }
        }
    });
});
let idUser = '';
formCode && formCode.addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const code = document.querySelector("input[name=code]");
        if (code.value.trim() === '') {
            isError(code, '(*) Vui lòng nhập mã!');
        }
        else {
            const dataUser = yield postData('auth/confirmEmailCode', new FormData(formCode));
            if (!dataUser) {
                isError(code, '(*) Mã không đúng. Vui lòng kiểm tra lại!');
                return;
            }
            if (dataUser.statusCode === 200) {
                idUser = dataUser.id;
                alert('Xác nhận email thành công!');
                formCode.classList.add('hide');
                formNewPass.classList.remove('hide');
            }
            else {
                isError(code, '(*) Mã không đúng. Vui lòng kiểm tra lại!');
            }
        }
    });
});
formNewPass && formNewPass.addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const password = document.querySelector("input[name=newpassword]");
        if (password.value.trim() === '') {
            isError(password, '(*) Vui lòng nhập mật khẩu!');
            return;
        }
        if (password.value.length < 5) {
            isError(password, '(*) Vui lòng nhập mật khẩu!');
            return;
        }
        isSuccess(password);
        const formData = new FormData(formNewPass);
        formData.append('id', idUser);
        formData.append('password', password.value);
        const dataUser = yield postData('auth/update-password', formData);
        if (!dataUser) {
            alert('Đổi mật khẩu thất bại!');
            return;
        }
        if (dataUser) {
            alert('Đổi mật khẩu thành công!');
            window.location.href = '../site/login.html';
        }
    });
});
