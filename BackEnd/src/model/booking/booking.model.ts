import type { Decimal } from "@prisma/client/runtime/library";

export interface Booking {
  id?: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  booking_type_id?: string;
  quantity: number;
  check_in: Date;
  check_out: Date;
  service_id: string;
  create_at?: Date;
  service_item_id: string;
}

export interface HotelBooking extends Booking {
  adult: number;
  children: number;
}

export interface RentalCarBooking extends Booking {
  pick_up_id: string;
  drop_off_id: string;
}

export interface ThingToDoBooking extends Booking {
  adult: number;
  children: number;
}
