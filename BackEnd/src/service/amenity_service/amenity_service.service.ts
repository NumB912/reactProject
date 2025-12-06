import prisma from "@/db";
import bcrypt from "bcryptjs";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model.js";



export class AmenityService {

    static async getAmenityService(){

        try{
            const amenityService = await prisma.amenityHotel.findMany({
                select:{
                    amenity:true,
                    id:true,
                    icon:true,
                }
            })

            return amenityService
        }catch(error){
            console.error(error)
        }

    }

}
