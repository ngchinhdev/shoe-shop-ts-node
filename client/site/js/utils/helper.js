export function formatDate(value) {
    const date = new Date(value);
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 9 ? '0' + day : day}/${month < 9 ? '0' + month : month}/${year}`;
}