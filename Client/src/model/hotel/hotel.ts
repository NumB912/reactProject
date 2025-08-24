
import { Amenity, Facility } from "../facility";
import { Image } from "../image";
import { Service } from "../Service";

export interface hotel{
    service: Service;
    rooms: Room[];
    highLight:Amenity[]
    amenities:Amenity[]
    introduce:string;
    
}

export interface Room{

    roomID:string;
    name:string;
    quantity:number;
    price:number;
    area:number;
    beds: Bed[];
    facilities: Facility[];
    images: Image[];
}

export interface Bed {
    id: string;
    name: string;
    quanlity:number;
}
