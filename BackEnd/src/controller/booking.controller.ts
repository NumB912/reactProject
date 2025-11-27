import { BookingType } from "@/enum/booking/booking.enum";
import type { HotelBooking } from "@/model/booking/booking.model";
import { HotelBookingService } from "@/service/booking/bookingHotel.service";
import { RentalCarBookingService } from "@/service/booking/bookingRentalCar.service";
import { ThingToDoBookingService } from "@/service/booking/bookingThingToDo.service";
import type { Request, Response } from "express";

class BookingController {
  static async bookingService(req: Request, res: Response) {
    try {
      const { service } = req.body;

      if (!service || typeof service !== "object") {
        return res.status(400).json({ message: "service phải là object" });
      }

      const {type} = service;
      let services = {}
      switch(type){
        case BookingType.BOOKING_THING_TO_DO:
             services = await ThingToDoBookingService.getInstance().bookingService(service)
             break;
        case BookingType.BOOKING_RENTAL_CAR:
             services = await RentalCarBookingService.getInstance().bookingService(service);
             break;
        case BookingType.BOOKING_ROOM:
             services = await HotelBookingService.getInstance().bookingService(service)
             break;
      }
      return services;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return res
        .status(500)
        .json({ message: "Lỗi hệ thống, vui lòng thử lại sau." });
    }
  }
}

export default BookingController;
