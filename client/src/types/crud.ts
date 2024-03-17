export interface CRUDOperations {
    addNewBtn?: null | HTMLSpanElement;
    table: HTMLTableElement;
    data: Promise<[]>;

    handleAdd(): void;
    handleDelete(id: string): void;
    handleUpdate(id: string): void;
}