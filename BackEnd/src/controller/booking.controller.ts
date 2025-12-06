import prisma from "@/db";
import { BookingType } from "@/enum/booking/booking.enum";
import { PaymentEnum } from "@/enum/Payment/payment.enum";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { HotelBooking } from "@/model/booking/booking.model";
import { HotelBookingService } from "@/service/booking/bookingHotel.service";
import { RentalCarBookingService } from "@/service/booking/bookingRentalCar.service";
import { ThingToDoBookingService } from "@/service/booking/bookingThingToDo.service";
import type { Booking } from "@prisma/client";
import type { Request, Response } from "express";

class BookingController {
  static async bookingService(req: Request, res: Response) {
    try {
      const booking = req.body;
      if (!booking || typeof booking !== "object") {
        return res.status(400).json({ message: "service phải là object" });
      }

      const typeService = await prisma.service.findUnique({
        where:{
          id:booking.service_id
        },
        select:{
          service_type_id:true,
        }
      })


      let bookingTemp:SuccessResponse<Booking> | ErrorResponse
      switch(typeService?.service_type_id as ServiceType){
        case ServiceType.THING_TO_DO:
             bookingTemp = await ThingToDoBookingService.getInstance().bookingService(booking)
             break;
        case ServiceType.RENTAL_CAR:
             bookingTemp = await RentalCarBookingService.getInstance().bookingService(booking);
             break;
        case ServiceType.HOTEL:
             bookingTemp = await HotelBookingService.getInstance().bookingService(booking)
             break;
      }

      
      if(!bookingTemp.success){
        return res.status(bookingTemp.status).json({
          ...bookingTemp
        })
      }

      const createPayment = await prisma.payment.create({
        data:{
          amount:bookingTemp.data.total_amount,
          booking_id:bookingTemp.data.id,
          status_id:PaymentEnum.AWAITTING_PAYMENT,
          create_at:new Date(),
          expired_date:new Date(new Date().getTime() + 30 * 60 * 1000),
        }
      })

      return res.status(bookingTemp.status).json({
        booking:bookingTemp,
        id:createPayment.id
      })

    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return res
        .status(500)
        .json({ message: "Lỗi hệ thống, vui lòng thử lại sau." });
    }
  }
}

export default BookingController;
