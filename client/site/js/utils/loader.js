export function loader(container, time = 0) {
    container.insertAdjacentHTML('beforeend', '<div class="loader"></div>');

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

export function loader2(container, time = 0) {
    container.insertAdjacentHTML('beforeend', '<div class="loader-wrap"><span class="loader"></span></div>');

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}