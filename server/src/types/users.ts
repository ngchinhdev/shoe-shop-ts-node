export interface IUser {
    _id?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    address?: string;
    isAdmin?: boolean;
    isDeleted: boolean;
}