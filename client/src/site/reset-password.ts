import { postData } from "../api/apiData.js";

const email = document.querySelector("input[name=email]") as HTMLInputElement;
const formEmail = document.querySelector("form.form-email") as HTMLFormElement;

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

        if (dataUser.statusCode === 200) {
            alert('Vui lòng kiểm tra email để đặt lại mật khẩu!');
            formEmail.classList.add('hide');

            document.querySelector('.form-code')?.classList.remove('hide');
        } else {
            checkEmail(email, true);
        }
    }
});