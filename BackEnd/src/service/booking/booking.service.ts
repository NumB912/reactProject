
import { BookingType } from "@/enum/booking/booking.enum";
import type {
  Booking,
} from "@/model/booking/booking.model";
import type { Booking as PrismaBooking } from "@prisma/client";

export interface IBookingService<T extends Booking = Booking> {
  bookingService( data: T): Promise<PrismaBooking>;
}




