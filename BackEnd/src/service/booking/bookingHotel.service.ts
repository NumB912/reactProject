import { BookingType } from "@/enum/booking/booking.enum";
import type { HotelBooking } from "@/model/booking/booking.model";
import type { IBookingService } from "./booking.service";
import prisma from "@/db";
import type { Booking as PrismaBooking } from "@prisma/client";
import { ServiceItemStatus } from "@/enum/service_item/status.serviceItem.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";

export class HotelBookingService implements IBookingService {

  private static instance:HotelBookingService

  public static getInstance():HotelBookingService{

    if(!HotelBookingService.instance){
      return HotelBookingService.instance =  new HotelBookingService()
    }
    return HotelBookingService.instance
  }

  async bookingService(
    data: HotelBooking
  ): Promise< SuccessResponse<PrismaBooking> | ErrorResponse> {



    const service_item = await prisma.serviceItem.findFirst({
      where: {
        id:service_item_id,
        status_id:ServiceItemStatus.ACTIVE,
      }
    })

    if(!service_item){
       throw Error('Dịch vụ không có sẵn')
    }

    return {
      data:"",
      message:"",
      status:202,
    }
  }
}