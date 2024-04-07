import { getFullData } from "../api/apiData.js";
import { CRUDOperations } from "../types/crud.js";
import { loaderCircle } from "./loaders.js";

export default abstract class CRUD implements CRUDOperations {
    container!: HTMLDivElement;
    addNewBtn?: null | HTMLSpanElement;
    table!: HTMLTableElement;
    data!: Promise<[]>;

    constructor(endpoint: string) {
        this.initialize(endpoint);
    }

    async initialize(endpoint: string) {
        this.container = document.querySelector('main') as HTMLDivElement;

        await this.loader();
        this.data = await getFullData(endpoint);

        if (!(await this.data).length) {
            this.container.innerHTML = '<p>Không có dữ liệu</p>';
            return;
        }

        await this.generateMainMarkup(await this.data);

        this.addNewBtn = document.querySelector('.add-new span') as HTMLSpanElement;
        this.table = document.querySelector('table') as HTMLTableElement;

        await this.handleCRUD();
    }

    async handleCRUD() {
        this.addNewBtn?.addEventListener('click', async () => {
            await this.handleAdd();
        });

        this.table.addEventListener('click', async (e) => {
            const btn = e.target as HTMLSpanElement;

            if (btn.classList.contains('del-btn')) {
                const id = btn.dataset.id as string;

                await this.handleDelete(id);
            }

            if (btn.classList.contains('change-btn')) {
                const id = btn.dataset.id as string;

                await this.handleUpdate(id);
            }

            if (btn.classList.contains('detail-btn')) {
                const id = btn.dataset.id as string;

                await this.handleDetail(id);
            }
        });
    }

    async loader() {
        this.container.innerHTML = '';
        await loaderCircle(this.container, 500);
    }

    clearAndInsertToContainer(markup: string) {
        this.container.innerHTML = '';
        this.container.insertAdjacentHTML('beforeend', markup);
    }

    abstract generateMainMarkup(data: any[]): Promise<void>;

    abstract handleAdd(): Promise<void>;

    abstract handleDelete(id: string): Promise<void>;

    abstract handleUpdate(id: string): Promise<void>;

    handleDetail(id: string) { }
}