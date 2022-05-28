export default interface YamlParsedDTO {
    users: UserDTO[];
}

export interface UserDTO {
    email: String;
    nickname: String;

    offers?: OfferDTO[];
}

export interface OfferDTO {
    title: String;
    description: String;
    price: Number;
    place: String;
    finished: boolean;

    categories: CategoryDTO[];
    photos: PhotoDTO[];
}

export interface CategoryDTO {
    name: String;
}

export interface PhotoDTO {
    path: String;
    description: String;
}