import { Image } from "./ImagePhotoUrl";

export interface ProfileUser{
    userName:string;
    name:string;
    profileID:string;
    following:number;
    follower:number;
    introduce:Introduce;
    photoShares:PhotoShare;
    wallpaperPhoto:Image;
    reviews:number
    avatarPhoto:Image;
}

export interface Introduce{
    introduceID:string;
    location:string;
    phoneNumber:string;
    email:string;
    about:string;
}

export interface PhotoShare{
    photoShareID:string;
    photos:Image[];
}

export interface Reviews{
    reviewsID:string;
    titleReview:string;
    serviceID:string;
    content:string;
    photoUpload:Image[];
    date:Date;
    rating:Number;
}




