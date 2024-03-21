export function loaderDot(container: HTMLElement, time = 0) {
    container.innerHTML = '<div class="loader"></div>';

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

export function loaderCircle(container: HTMLDivElement, time = 0) {
    container.innerHTML = '<div class="loader-wrap"><span class="loader"></span></div>';

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}