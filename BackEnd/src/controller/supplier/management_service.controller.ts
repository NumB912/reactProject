import prisma from "@/db";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import { ImageService } from "@/service/image/image.service";
import { ManagementService } from "@/service/management-service/management.service";
import { ManagementAmenityHotel } from "@/service/service/amenitiesService/amenities.service";
import { HotelService } from "@/service/service/hotel.service";
import { RentalCarService } from "@/service/service/rentalCar.service";
import { ThingToDoService } from "@/service/service/tour.service";
import type { Image, Service } from "@prisma/client";
import { error } from "console";
import { create } from "domain";
import type { Request, Response } from "express";
import type { Multer } from "multer";

export class managementServiceController {
  static async addService(req: Request, res: Response) {
    try {
      const {location,info,service_type_id,price_from,price_to,service_name,status_id} = req.body;
        const payload = req.user;
      if (!payload || !payload.sub) {
        return res.status(400).json({
          message: "Không tồn tại người dùng",
        });
      }

      const id = payload.sub;

      const locaitonNew = JSON.parse(location)
      const createService = await ManagementService.addService( 
        id,
        service_type_id,
        locaitonNew,
        info,
        service_name,
        price_from,
        price_to,
        status_id,
        );
      return res.status(createService.status).json(createService);
    } catch (error) {
      console.error("error", error);
      return res.status(500).json(error);
    }
  }

  
  static async getServices(req: Request, res: Response) {
    try {
     const payload = req.user;
      if (!payload || !payload.sub) {
        return res.status(400).json({
          message: "Không tồn tại người dùng",
        });
      }

      const id = payload.sub;

      const createService = await ManagementService.getService(id)

      return res.status(createService.status).json(createService);
    } catch (error) {
      console.error("error", error);
      return res.json(error);
    }
  }

  static async getServiceDetail(req: Request, res: Response) {
    try {
     const payload = req.user;
     const {service_id} = req.query
      if (!payload || !payload.sub) {
        return res.status(400).json({
          message: "Không tồn tại người dùng",
        });
      }

         if (!service_id || typeof service_id != "string") {
        return res.status(400).json({
          message: "Không tồn tại người dùng",
        });
      }

      const id = payload.sub;
      const getDetail = await ManagementService.getDetailService(service_id,id)
      return res.status(getDetail.status).json(getDetail);
    } catch (error) {
      console.error("error", error);
      return res.json(error);
    }
  }

  static async updateService(req: Request, res: Response) {
    try {
      const {service_id} = req.query
      console.log(req.body)
      const {amenities,image_change,location,info,service} = req.body;
      const {price_from,price_to,service_name,status_id} = JSON.parse(service)
      const imageFiles = (req.files as any)?.imageFiles as
        | Express.Multer.File[]
        | undefined;

      if(!location){
          return res.status(400).json({ message: "Không có vị trí" });
      }

      
      if(!service_id || typeof service_id !== "string"){
          return res.status(400).json({ message: "Lỗi không có dịch vụ" });
      }
     
      const amenitiesNew = JSON.parse(amenities)
      console.log(amenitiesNew)
      const locaitonNew = JSON.parse(location)
      const updateServiceManagement = await ManagementService.updateService(
        service_id,
        locaitonNew,
        service_name,
        price_from,
        price_to,
        status_id,
        info,
        image_change,
        amenitiesNew||[],

        imageFiles
      );

      return res.status(updateServiceManagement.status).json({
        ...updateServiceManagement,
      });
    } catch (error) {
      console.error("error", error);
    }
  }


}
