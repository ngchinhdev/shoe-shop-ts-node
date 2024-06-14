import { getData } from "../api/apiData.js";
import { IProduct } from "../types/products.js";
import { formatPrice } from "./helpers.js";

const quantityCartHeader = document.querySelector('.cart_site li:nth-child(2) span') as HTMLSpanElement;
const priceCartHeader = document.querySelector('.cart_site li:nth-child(3) b') as HTMLElement;

function updateQuantityCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')!) || [];

    quantityCartHeader.innerText = (cartData.length > 99 ? '99+' : cartData.length) || 0;

    return cartData;
}

function updateTotalPriceCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')!) || [];

    const totalPrice = cartData.reduce((acc: number, cur: any) => acc += +cur.price * cur.quantity, 0);
    priceCartHeader.innerText = formatPrice(totalPrice) || formatPrice(0);

    return cartData;
}

export async function updateLikesHeader() {
    const likeBox = document.querySelector('.likes-box') as HTMLElement;

    const likesArr = JSON.parse(localStorage.getItem('likes')!) || [];

    document.querySelector('.cart_site li:first-child span')!.innerHTML = likesArr.length;

    if (!likesArr.length) {
        likeBox.innerHTML = '';
        likeBox.insertAdjacentHTML('beforeend', '<small>Chưa có sản phẩm</small>');
        return;
    }

    const promises = likesArr.map(async (id: string) => await getData('products', id));

    const productLiked = await Promise.all(promises);

    const html = `<table>
                    ${productLiked.map(prod => `<tr>
                            <td>
                                <a href="detail.html?cate=${prod.categoryId}&id=${prod._id}">
                                    <image src='${prod.images[0]}' />
                                </a>
                            </td>
                            <td>
                                <a href="detail.html?cate=${prod.categoryId}&id=${prod._id}" class="like-name">${prod.name}</a>
                            </td>
                            <td>
                                <div class="del-like" data-del="${prod._id}">x</div>
                            </td>
                        </tr>`).join('')}
                </table>`;

    likeBox.innerHTML = '';
    likeBox.insertAdjacentHTML('beforeend', html);
}

export default function updateHeader() {
    updateQuantityCartHeader();
    updateTotalPriceCartHeader();
    updateLikesHeader();
}
