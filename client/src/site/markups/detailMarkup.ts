import { type IProduct } from "../../types/products.js";
import { formatPrice } from "../../utils/helpers.js";

const informationContainer = document.querySelector('.detail_row') as HTMLDivElement;

export async function generateInfoProduct(product: IProduct) {

    const { _id, name, price, orgPrice, images, description } = product;

    if (!_id || !name || !price || !orgPrice || !images || !description) return;

    const navigationBar = document.querySelector('.navigation_bar ul') as HTMLUListElement;
    navigationBar.insertAdjacentHTML('beforeend', `<li>
                                                        <span> <i class="fa fa-angle-right"></i> </span>
                                                        <a href="detail.html?id=${_id}">${name}</a>
                                                    </li>`);

    const informationMarkup = `<div class="detail_images detail_col">
                                    <div class="small_pics">
                                        ${images.map(image => `<div class="pic_col">
                                            <img src="${image}" alt="Product">
                                        </div>`).join('')}
                                    </div>
                                    <div class="main_pic">
                                        <img src="${images[0]}" alt="Product">
                                    </div>
                                </div>
                                <div class="product_details_text detail_col">
                                    <h3>${name}</h3>
                                    <div class="product_details_price">
                                        <del>${formatPrice(orgPrice)}</del>
                                        <span>${formatPrice(price)}</span>
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
                                    <a href="#" data-cart=${_id} class="primary_btn add_cart">+ GIỎ HÀNG</a>
                                    <a href="checkout.html?id=${_id}&quantity=1" class="primary_btn buy_now">MUA NGAY</a>
                                    <a href="#" class="heart_icon" data-like=${_id}>
                                        <span class="icon_heart_alt">
                                            <i class="fa fa-heart ${''}" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </div>`;

    informationContainer.innerHTML = '';
    informationContainer.insertAdjacentHTML('beforeend', informationMarkup);
};;