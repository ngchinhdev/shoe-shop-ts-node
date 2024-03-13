import { getProducts } from "../api/apiProducts.js";
import { formatPrice } from "./formatPrice.js";

function updateQuantityCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const quantityCartHeader = document.querySelector('.cart_site li:nth-child(2) span');

    // const totalQuantities = cartData.reduce((acc, cur) => acc += cur.quantity, 0);
    quantityCartHeader.innerText = (cartData.length > 99 ? '99+' : cartData.length) || 0;

    return cartData;
}

function updateTotalPriceCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const priceCartHeader = document.querySelector('.cart_site li:nth-child(3) b');

    const totalPrice = cartData.reduce((acc, cur) => acc += +cur.price * cur.quantity, 0);
    priceCartHeader.innerText = formatPrice(totalPrice) || formatPrice(0);

    return cartData;
}

export async function updateLikesHeader() {
    const likeBox = document.querySelector('.likes-box');

    const likesArr = JSON.parse(localStorage.getItem('likes')) || [];

    document.querySelector('.cart_site li:first-child span').innerHTML = likesArr.length;

    if (!likesArr.length) {
        likeBox.innerHTML = '';
        likeBox.insertAdjacentHTML('beforeend', '<small>Chưa có sản phẩm</small>');
        return;
    }

    const promises = likesArr.map(async id => await getProducts(id));

    const productLiked = await Promise.all(promises);

    const html = `<table>
                    ${productLiked.map(prod => `<tr>
                            <td>
                                <a href="detail.html?cate=${prod.category}&id=${prod.id}">
                                    <image src='../../images/products/${prod.images[0]}' />
                                </a>
                            </td>
                            <td>
                                <a href="detail.html?cate=${prod.category}&id=${prod.id}" class="like-name">${prod.name}</a>
                            </td>
                            <td>
                                <div class="del-like" data-del="${prod.id}">x</div>
                            </td>
                        </tr>`).join('')}
                </table>`;

    likeBox.innerHTML = '';
    likeBox.insertAdjacentHTML('beforeend', html);
}

export function updateHeader() {
    updateQuantityCartHeader();
    updateTotalPriceCartHeader();
}