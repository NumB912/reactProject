import { Image } from "../model/image";


export interface profile{
    id:string,
    bio:string,
    phone:string
    name:string,
    wallpaper:{url:string,alt:string},
    image:{url:string,alt:string}
}



