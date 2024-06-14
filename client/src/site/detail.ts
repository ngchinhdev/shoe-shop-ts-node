import { getData, getFullData } from "../api/apiData.js";
import { addToCart, handleLikeAddCart } from "../utils/productHandler.js";
import { generateInfoProduct } from "./markups/detailMarkup.js";
import { generateProducts } from "./markups/productMarkup.js";

const informationContainer = document.querySelector('.detail_row') as HTMLDivElement;
const relatedProductContainer = document.querySelector('.list_prod') as HTMLDivElement;

let currQuantity = 1;

function adjustQuantity(btn: string, idProd: string) {
    const inputQuantity = document.querySelector('.ip-qtt') as HTMLInputElement;

    if (btn === 'dec' && currQuantity < 2) return;

    btn === 'dec' ? --currQuantity : ++currQuantity;

    inputQuantity.value = `${currQuantity}`;

    const buyNowBtn = document.querySelector('.buy_now') as HTMLAnchorElement;
    buyNowBtn.href = `checkout.html?id=${idProd}&quantity=${currQuantity}`;
}

const handleControl = (idProd: string) => {
    const decBtn = document.querySelector('.pro_qty .dec') as HTMLButtonElement;
    const incBtn = document.querySelector('.pro_qty .inc') as HTMLButtonElement;
    decBtn.addEventListener('click', () => adjustQuantity('dec', idProd));
    incBtn.addEventListener('click', () => adjustQuantity('inc', idProd));

    const mainImage = document.querySelector('.main_pic img') as HTMLImageElement;
    const smallImages = Array.from(document.querySelectorAll('.pic_col img')) as HTMLImageElement[];

    smallImages.forEach(img => img.addEventListener('click', function () {
        mainImage.src = img.src;
    }));
};

(async function () {
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const idProd = queryParams.get('id') as string;
        const cate = queryParams.get('cate') as string;

        const relatedProducts = await getFullData(`products/categoryId/${cate}`);
        const product = await getData('products', idProd);

        // Generate details product
        await generateInfoProduct(informationContainer, product);
        handleControl(idProd);

        document.querySelector('.add_cart')!.addEventListener('click', async function (e) {
            const btn = e.target as HTMLElement;

            if (btn.hasAttribute('data-cart')) {
                e.preventDefault();

                const curId = btn.dataset.cart as string;

                await addToCart(curId, currQuantity);
            }
        });

        await generateProducts(relatedProductContainer, relatedProducts.slice(0, 4));
        handleLikeAddCart();
    } catch (error) {
        relatedProductContainer.innerHTML = '<p class="not-found">Không có sản phẩm nào!</p>';
        console.log(error);
    }
})()

