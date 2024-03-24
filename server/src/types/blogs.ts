export interface IBlog {
    _id: string;
    title?: string;
    content?: string;
    thumbnail?: string;
    category?: string;
    oldThumbnail?: string;
    isDeleted: boolean;
}

export interface IBlogParams {
    id?: string;
}