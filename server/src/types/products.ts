export interface IProduct {
    name?: string;
    description?: string;
    price?: number;
    orgPrice?: number;
    images?: string[];
    hot?: boolean;
    types?: { size?: string, color?: string, quantity?: number; }[];
    quantity?: number;
    category?: number;
}