export default interface YamlParsedDTO {
    users: UserDTO[];
}

export interface UserDTO {
    email: string;
    nickname: string;

    offers?: OfferDTO[];
}

export interface OfferDTO {
    title: string;
    description: string;
    price: number;
    place: string;
    finished: boolean;

    categories: CategoryDTO[];
    photos: PhotoDTO[];
}

export interface CategoryDTO {
    name: string;
}

export interface PhotoDTO {
    path: string;
    description: string;
}