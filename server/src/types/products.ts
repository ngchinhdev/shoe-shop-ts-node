export interface IProduct {
    name?: string;
    description?: string;
    price?: number;
    orgPrice?: number;
    images?: string[];
    oldImages?: string;
    hot?: boolean;
    color?: string;
    types?: string;
    categoryId?: string;
    isDeleted: boolean;
}

export interface IProductParams {
    id?: string;
}