import type { Request, Response } from "express";
import { AmenityService } from "@/service/amenity_service/amenity_service.service";


class AmenityServiceController {
    static async getAmenityService(req:Request,res:Response){
        try{

            const amenity = await AmenityService.getAmenityService()

            res.status(200).json({
                amenity
            })

        }catch(error){
            res.status(500).json({
                message:"Lỗi hệ thống"
            })
        }
    }
}

export default AmenityServiceController;
