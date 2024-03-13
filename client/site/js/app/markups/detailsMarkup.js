import { getProducts } from "../../api/apiProducts.js";
import { isAlreadyLiked } from "../../utils/addLike.js";
import { formatPrice } from "../../utils/formatPrice.js";

const imagesContainer = document.querySelector('.detail_images');
const informationContainer = document.querySelector('.product_details_text');

export async function generateImagesProduct(idProd) {
    const product = await getProducts(idProd);

    const { images } = product;

    const imagesMarkup = `<div class="main_pic">
                                <img src="./images/products/${images[0]}" alt="Product">
                            </div>
                            <div class="small_pics">
                                ${images.map(image => `<div class="pic_col">
                                        <img src="./images/products/${image}" alt="Product">
                                    </div>`).join('')}
                            </div>`;

    imagesContainer.innerHTML = '';
    imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup);
}

export async function generateInfoProduct(idProd) {
    const product = await getProducts(idProd);

    const { id, name, price, orgPrice, quantity, likes, purchased, mass, images, description } = product;

    const navigationBar = document.querySelector('.navigation_bar ul');
    navigationBar.insertAdjacentHTML('beforeend', `<li>
                                        <span> <i class="fa fa-angle-right"></i> </span>
                                        <a href="detail.html?id=${id}">${name}</a>
                                    </li>`);

    const informationMarkup = `
                            <h3>${name}</h3>
                            <div class="product_details_price">
                                <del>${formatPrice(orgPrice)}</del>
                                <span>${formatPrice(price)}</span>
                                <span class="mass_detail">${mass}</span>
                            </div>
                            <p>${description}</p>
                            <div class="product_details_quantity">
                                <div class="quantity">
                                    <div class="pro_qty">
                                        <span class="dec qtybtn">-</span>
                                        <input type="number" class="ip-qtt" value="1">
                                        <span class="inc qtybtn">+</span>
                                    </div>
                                </div>
                            </div>
                            <a href="#" data-cart=${id} class="primary_btn add_cart">+ GIỎ HÀNG</a>
                            <a href="checkout.html?id=${id}&quantity=1" class="primary_btn buy_now">MUA NGAY</a>
                            <a href="#" class="heart_icon" data-like=${id}>
                                <span class="icon_heart_alt">
                                    <i class="fa fa-heart ${isAlreadyLiked(id) ? 'active' : ''}" aria-hidden="true"></i>
                                </span >
                            </a > `;

    informationContainer.innerHTML = '';
    informationContainer.insertAdjacentHTML('beforeend', informationMarkup);
};;