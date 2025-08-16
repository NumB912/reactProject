import { Contact } from "./contact";
import { Image } from "./image";

export interface Service{
    serviceID: string;
    name:string;
    rating: number;
    ratingQuantity: number;
    reviewQuantity:number;
    address:string;
    contact: Contact;
    review: string;
    Images: Image[];
}

