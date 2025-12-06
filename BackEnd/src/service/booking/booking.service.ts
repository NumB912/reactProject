
import { BookingType } from "@/enum/booking/booking.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type {
  Booking,
} from "@/model/booking/booking.model";
import type { Prisma, Booking as PrismaBooking } from "@prisma/client";

export interface IBookingService<T extends Booking = Booking> {
  bookingService( data: T): Promise< SuccessResponse<PrismaBooking> | ErrorResponse>;
}




