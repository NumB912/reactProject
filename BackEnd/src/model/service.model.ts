import type { Decimal } from "@prisma/client/runtime/library";

export class ServiceModel{
    info?: string | null;
    id?: string;
    service_name: string | null | undefined;
    supplier_id: string | undefined;
    rating?: Decimal |null;
    total_reviews?: number |null;
    create_at?: Date | null;
    update_at?: Date | null;
    description?: string | null;
    location_id: string | null | undefined;
    service_type_id: string | null |undefined;
    status_id?: string | null;
    price_from?: Decimal |null;
    price_to?: Decimal |null;
}

export class HotelServiceModel extends ServiceModel{
    quantity_room?: number | null;
    type_hotel_id?: number | null;
}

export class RentalCarServiceModel extends ServiceModel{

}

export class ThingToDoServiceModel extends ServiceModel{

}