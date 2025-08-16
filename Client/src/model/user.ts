import { Image } from "../interface/ImagePhotoUrl";

export interface User {
    userID: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    avatar: Image;
    wallpaper: Image;
}
