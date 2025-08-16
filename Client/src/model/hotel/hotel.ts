
import { Facility } from "../facility";
import { Service } from "../service";

export interface hotel{
    service:Service;
    rooms: Room[];
}

export interface Room{
    roomID:string;
    name:string;
    quantity:number;
    price:number;
    area:number;
    beds: Bed[];
    facilities: Facility[];
}

export interface Bed {
    id: string;
    name: string;
}
