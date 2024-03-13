import { getProducts } from "../api/apiProducts.js";
import { generateImagesProduct, generateInfoProduct } from "./markups/detailsMarkup.js";
import { generateNavigation } from "./markups/navigationMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "../utils/addToCart.js";
import { updateHeader } from "../utils/updateHeader.js";
import { handleClickLike, handleToggleLike } from "../utils/addLike.js";

const relatedProductContainer = document.querySelector('.list_prod');

const params = new URLSearchParams(window.location.search);
const idProd = params.get('id');
const cateProd = +params.get('cate');

let currQuantity = 1;

function adjustQuantity(btn) {
    const inputQuantity = document.querySelector('.ip-qtt');

    if (btn === 'dec' && currQuantity < 2) return;

    btn === 'dec' ? --currQuantity : ++currQuantity;

    inputQuantity.value = currQuantity;

    const buyNowBtn = document.querySelector('.buy_now');
    buyNowBtn.href = `checkout.html?id=${idProd}&quantity=${currQuantity}`;
}

function handleControl() {
    const decBtn = document.querySelector('.pro_qty .dec');
    const incBtn = document.querySelector('.pro_qty .inc');
    decBtn.addEventListener('click', () => adjustQuantity('dec'));
    incBtn.addEventListener('click', () => adjustQuantity('inc'));

    const mainImage = document.querySelector('.main_pic img');
    const smallImages = document.querySelectorAll('.pic_col img');

    smallImages.forEach(img => img.addEventListener('click', function () {
        mainImage.src = img.src;
    }));
}

function handleLikeInDetail() {
    const heartBtn = document.querySelector('.heart_icon');

    heartBtn.addEventListener('click', async function (e) {
        e.preventDefault();

        handleToggleLike(heartBtn.querySelector('i'));
        await handleClickLike(heartBtn.dataset.like);
    });
}

function handleLikeAddCartRelated() {
    document.querySelector('.list_prod').addEventListener('click', async function (e) {
        const btn = e.target;

        if (btn.hasAttribute('data-like')) {
            e.preventDefault();

            const curId = +btn.dataset.like;
            handleToggleLike(btn);

            await handleClickLike(curId);
        }

        if (btn.hasAttribute('data-cart')) {
            e.preventDefault();

            const curId = +btn.dataset.cart;

            await addToCart(curId);
        }
    });
}

async function init() {
    // Generate details product
    await generateNavigation(cateProd);
    await generateImagesProduct(idProd);
    await generateInfoProduct(idProd);

    handleControl();
    handleLikeInDetail();
    handleLikeAddCartRelated();

    document.querySelector('.add_cart').addEventListener('click', async function (e) {
        const addCartBtn = e.target;

        if (!addCartBtn.hasAttribute('data-cart')) return;

        e.preventDefault();

        const curId = addCartBtn.dataset.cart;

        addToCart(curId, currQuantity);
    });

    // Generate related products
    const orgProducts = await getProducts();

    const filteredProducts = orgProducts.filter(product => product.category === cateProd && product.id !== idProd);

    await generateProducts(relatedProductContainer, filteredProducts.length ? filteredProducts.slice(0, 4) : orgProducts.slice(0, 2));
}

await init();
