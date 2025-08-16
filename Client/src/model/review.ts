import { Image } from "../interface/ImagePhotoUrl";
import { User } from "./user";

export interface Review {
    reviewID: string;
    serviceID: string;
    user: User;
    rating: number;
    comment: string;
    images: Image[];
}
