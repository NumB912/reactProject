import { BookingType } from "@/enum/booking/booking.enum";
import type { RentalCarBooking } from "@/model/booking/booking.model";
import type { IBookingService } from "./booking.service";
import prisma from "@/db";
import type { Booking as PrismaBooking } from "@prisma/client";
import { ServiceItemStatus } from "@/enum/service_item/status.serviceItem.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
export class RentalCarBookingService implements IBookingService {
  constructor(){}

  private static instance:RentalCarBookingService

  public static getInstance():RentalCarBookingService{
    if(!RentalCarBookingService.instance){
      return RentalCarBookingService.instance = new RentalCarBookingService()
    }   

    return RentalCarBookingService.instance
  }

  async bookingService(
    data: RentalCarBooking
  ): Promise< SuccessResponse<PrismaBooking> | ErrorResponse> {


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
        total_amount: data.total_amount,
        check_in: data.check_in,
        check_out: data.check_out,
        service_id: data.service_id,
        service_item_id: data.service_item_id,
        pick_up_id: data.pick_up_id,
        drop_off_id: data.drop_off_id,
      },
    });
  }
}