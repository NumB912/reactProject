import prisma from "@/db";
import type { Booking, HotelBooking } from "@/model/booking/booking.model";
import type { Booking as prismaBooking } from "@prisma/client";


export interface IBookingService {
  bookingService<T extends Partial<Booking>>(data: T): Promise<prismaBooking>;
}
export class HotelBookingService implements IBookingService{
   async bookingService(bookingService: HotelBooking): Promise<prismaBooking> {
        const bookingHotel = await prisma.booking.create({
            data:{
                ...bookingService,
                adult:bookingService.adult,
                check_in:bookingService.check_in,
                check_out:bookingService.check_out,
                booking_type_id:
            }
        })

        return bookingHotel
    }
}   