export interface IOrder {
    _id: string;
    userId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    paymentMethod: string;
    note: string;
    status: string;
    items: {
        product: string;
        quantity: number;
    }[];
    createdAt: string;
}