import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface Facility {
    facilityID: string;
    name:string;
    amenities: Amenity[];
}

export interface Amenity{
    amenityID: string;
    name: string;
    icon: IconName;
}
