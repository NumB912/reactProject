import { BookingType } from "@/enum/booking/booking.enum";
import type { Booking, ThingToDoBooking } from "@/model/booking/booking.model";
import type { IBookingService } from "./booking.service";
import prisma from "@/db";
import type { Booking as PrismaBooking } from "@prisma/client";
import { ServiceItemStatus } from "@/enum/service_item/status.serviceItem.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
export class ThingToDoBookingService implements IBookingService {
  private constructor() {}
  private static instance: ThingToDoBookingService;
  public static getInstance(): ThingToDoBookingService {
    if (!ThingToDoBookingService.instance) {
      ThingToDoBookingService.instance = new ThingToDoBookingService();
    }
    return ThingToDoBookingService.instance;
  }
  async bookingService(
    data: ThingToDoBooking
  ):Promise< SuccessResponse<PrismaBooking> | ErrorResponse> {

    const service_item = await prisma.serviceItem.findFirst({
      where: {
        id:data.service_item_id,
        status_id:ServiceItemStatus.ACTIVE,
      }
    })

    if(!service_item){
       throw Error('Dịch vụ không có sẵn')
    }

    return await prisma.booking.create({
      data: {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        booking_type_id:BookingType.BOOKING_THING_TO_DO,
        total_amount: data.total_amount,
        check_in: data.check_in,
        check_out: data.check_out,
        service_id: data.service_id,
        service_item_id: data.service_item_id,
        adult:data.adult,
        children:data.adult,
      },
    });
  }
}
