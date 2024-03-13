import { getCategories } from "../../api/apiCategories.js";

export async function generateNavigation(cateId = null, query = null) {
    if (cateId) {
        const categories = await getCategories();

        const curCate = categories.find(cate => cate.id == cateId);

        const navigationBar = document.querySelector('.navigation_bar ul');
        navigationBar.insertAdjacentHTML('beforeend', `<li>
                                        <span> <i class="fa fa-angle-right"></i> </span>
                                        <a href="product.html?cate=${cateId}">${curCate.name}</a>
                                    </li>`);
    }

    if (query) {
        const navigationBar = document.querySelector('.navigation_bar ul');
        navigationBar.insertAdjacentHTML('beforeend', `<li>
                                        <span> <i class="fa fa-angle-right"></i> </span>
                                        <span> Tìm kiếm </span>
                                        <span> <i class="fa fa-angle-right"></i> </span>
                                        <a href="product.html?query=${query}">${query}</a>
                                    </li>`);
    }
}