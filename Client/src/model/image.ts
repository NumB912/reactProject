import { User } from "./user";

export interface Image{
    imageID:string;
    url:string;
    altText:string;
    description:string;
    owner?:User;
}