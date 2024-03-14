export interface IProduct {
    _id?: string;
    name?: string;
    description?: string;
    price?: number;
    orgPrice?: number;
    images?: string[];
    hot?: boolean;
    color?: string;
    types?: { size?: string, quantity?: number; }[];
    categoryId?: string;
}