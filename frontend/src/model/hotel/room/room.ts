import { amenity } from "../../amenity";
import { Image } from "../../image";
import { ServiceItem } from "../../service_item";

export interface room extends ServiceItem{
    area:number,
    typeRoom:RoomType,
    amenitiesRooms:AmenityServiceItem[],
    max_people:number;
}

export interface AmenityServiceItem{
    amenityServiceItems:amenity;
}

interface RoomType{
    type:string
}