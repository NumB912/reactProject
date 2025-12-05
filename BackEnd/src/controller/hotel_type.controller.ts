import type { Request, Response } from "express";
import { HotelTypeService } from "@/service/hotel_type/hotel_type.service";


class HotelTypeController {
    static async getAmenityService(req:Request,res:Response){
        try{

            const hotelType = await HotelTypeService.getHotelType()
            res.status(200).json({
                hotelType
            })

        }catch(error){
            res.status(500).json({
                message:"Lỗi hệ thống"
            })
        }
    }
}

export default HotelTypeController;
