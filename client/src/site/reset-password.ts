import { postData } from "../api/apiData.js";

const email = document.querySelector("input[name=email]") as HTMLInputElement;
const formEmail = document.querySelector("form.form-email") as HTMLFormElement;
const formCode = document.querySelector("form.form-code") as HTMLFormElement;
const formNewPass = document.querySelector("form.form-newpass") as HTMLFormElement;

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

formEmail && formEmail.addEventListener('submit', async function (e: SubmitEvent) {
    e.preventDefault();

    if (!(checkEmail(email))) {
        checkEmail(email);
    } else {
        const dataUser = await postData('auth/sendmail', new FormData(formEmail));

        if (!dataUser) {
            checkEmail(email, true);
            return;
        }

        if (dataUser.statusCode === 200) {
            alert('Vui lòng kiểm tra email để đặt lại mật khẩu!');
            formEmail.classList.add('hide');

            document.querySelector('.form-code')?.classList.remove('hide');
        }
    }
});

let idUser = '';

formCode && formCode.addEventListener('submit', async function (e: SubmitEvent) {
    e.preventDefault();

    const code = document.querySelector("input[name=code]") as HTMLInputElement;

    if (code.value.trim() === '') {
        isError(code, '(*) Vui lòng nhập mã!');
    } else {
        const dataUser = await postData('auth/confirmEmailCode', new FormData(formCode));

        if (!dataUser) {
            isError(code, '(*) Mã không đúng. Vui lòng kiểm tra lại!');
            return;
        }

        if (dataUser.statusCode === 200) {
            idUser = dataUser.id;
            alert('Xác nhận email thành công!');
            formCode.classList.add('hide');
            formNewPass.classList.remove('hide');
        } else {
            isError(code, '(*) Mã không đúng. Vui lòng kiểm tra lại!');
        }
    }
});

formNewPass && formNewPass.addEventListener('submit', async function (e: SubmitEvent) {
    e.preventDefault();

    const password = document.querySelector("input[name=newpassword]") as HTMLInputElement;

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

    const dataUser = await postData('auth/update-password', formData);

    if (!dataUser) {
        alert('Đổi mật khẩu thất bại!');
        return;
    }

    if (dataUser) {
        alert('Đổi mật khẩu thành công!');
        window.location.href = '../site/login.html';
    }
});
