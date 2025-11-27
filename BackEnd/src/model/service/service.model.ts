import type { AmenitiesHotels } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export interface ServiceModel{
    info?: string|null;
    id?: string;
    service_name: string |null;
    supplier_id: string|null;
    rating?: Decimal|null;
    total_reviews?: number|null;
    create_at?: Date|null ;
    update_at?: Date|null ;
    description?: string|null ;
    location_id: string|null;
    service_type_id: string |null;
    status_id?: string|null;
    price_from?: Decimal|null;
    price_to?: Decimal|null;
}

export interface HotelServiceModel extends ServiceModel{
    quantity_room?: number | null;
    type_hotel_id?: string|null;
    amenity?:AmenitiesHotels[],
}

export interface RentalCarServiceModel extends ServiceModel{

}

export interface ThingToDoServiceModel extends ServiceModel{

}