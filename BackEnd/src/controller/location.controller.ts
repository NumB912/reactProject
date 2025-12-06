import { BookingType } from "@/enum/booking/booking.enum";
import type { HotelBooking } from "@/model/booking/booking.model";
import { HotelBookingService } from "@/service/booking/bookingHotel.service";
import { RentalCarBookingService } from "@/service/booking/bookingRentalCar.service";
import { ThingToDoBookingService } from "@/service/booking/bookingThingToDo.service";
import { LocationService } from "@/service/location/location.service";
import type { Request, Response } from "express";

class LocationController {
  static async getProvince(req: Request, res: Response) {
    try {
      const {q} = req.query

      if(typeof q !== "string"){
            return res.status(400).json({
                message:"Không có tỉnh thành này",
                status:400,
            })
      }


      const province = await LocationService.Getprovince(q);

      return res.status(province.status).json({
        ...province,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi trong quá trình thực hiện",
        status: 500,
      });
    }
  }

  static async searchLocation(req: Request, res: Response){
        try {
      const {q} = req.query

      if(typeof q !== "string"){
            return res.status(400).json({
                message:"Không có tỉnh thành này",
                status:400,
            })
      }


      const province = await LocationService.searchLLocation(q);

      return res.status(province.status).json({
        ...province,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi trong quá trình thực hiện",
        status: 500,
      });
    }
  }

    static async getWard(req: Request, res: Response) {
    try {
      const {province_code} = req.query

      if(typeof province_code !== "string" || province_code.trim().length === 0){
            return res.status(400).json({
                message:"Không có tỉnh thành này",
                status:400,
            })
      }

      const ward = await LocationService.GetWard(province_code);

      return res.status(ward.status).json({
        ...ward,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi trong quá trình thực hiện",
        status: 500,
      });
    }
  }
}

export default LocationController;
