import { Contact } from "./contact";
import { Image } from "./image";
import { postPhoto, Review } from "./review";

export interface Service{
    serviceID: string;
    name:string;
    rating: number;
    ratingQuantity: number;
    reviewQuantity:number;
    address:string;
    contact: Contact;
    reviewsAndPostPhotos: (Review|postPhoto)[];
    Images:postPhoto[],
    totalImages:number;
    totalReviews:number;
    totalImageReviews:number;
}

