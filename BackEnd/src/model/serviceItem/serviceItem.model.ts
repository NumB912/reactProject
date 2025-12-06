import type { Decimal } from "@prisma/client/runtime/library";

export interface ServiceItemModel {
  id?: string;
  price: Decimal|null;
  name: string |null;
  service_id: string|null;
  availiable_from: Date|null;
  availiable_to: Date|null ;
  status_id: string|null;
  type_id: string|null;
  location_id: string|null ;
  quantity:number|null;
}

export interface RoomModel extends ServiceItemModel {
  area: Decimal|null ;
  room_type_id: string|null;
  max_people: number|null;
}

export interface CarModel extends ServiceItemModel {
  transmission_id: string|null;
  car_type_id: string|null;
}

export interface TourModel extends ServiceItemModel {
  duration: Date|null;
}
