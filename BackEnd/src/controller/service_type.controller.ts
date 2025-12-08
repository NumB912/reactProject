import prisma from "@/db";
import { BookingType } from "@/enum/booking/booking.enum";
import type { HotelBooking } from "@/model/booking/booking.model";
import { HotelBookingService } from "@/service/booking/bookingHotel.service";
import { RentalCarBookingService } from "@/service/booking/bookingRentalCar.service";
import { ThingToDoBookingService } from "@/service/booking/bookingThingToDo.service";
import { LocationService } from "@/service/location/location.service";
import { ServiceType } from "@/service/service_type/service_type.service";
import type { Request, Response } from "express";

class serviceTypeController {
  static async getServiceType(req: Request, res: Response) {
    try {
      const service_type = await ServiceType.getServiceType();
        console.log("hello")
      return res.status(200).json({
        data: service_type,
        message: "thành công",
        status: 200,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return res
        .status(500)
        .json({ message: "Lỗi hệ thống, vui lòng thử lại sau." });
    }
  }
}

export default serviceTypeController;
