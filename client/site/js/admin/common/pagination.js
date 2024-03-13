import initProducts from "../products/productRow.js";

export function generatePagination(totalPages, curPage, container) {
    let item = '';
    for (let i = 0; i < totalPages; i++) {
        item += `<span data-page=${i} class=${curPage === i ? 'active' : ''}>${i + 1}</span>`;
    }

    const markup = `<div class="pagination">
                        ${item}
                    </div>`;

    container.insertAdjacentHTML('beforeend', markup);
}

export default async function handlePagination(container, curPage, init) {
    await init(container, curPage);
}
