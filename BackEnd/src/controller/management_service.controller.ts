import { ServiceType } from "@/enum/service/type.service.enum";
import { ImageService } from "@/service/image/image.service";
import { ManagementService } from "@/service/management-service/management.service";
import { HotelService } from "@/service/service/hotel.service";
import { RentalCarService } from "@/service/service/rentalCar.service";
import { ThingToDoService } from "@/service/service/tour.service";
import type { Image } from "@prisma/client";
import { error } from "console";
import { create } from "domain";
import type { Request, Response } from "express";
import type { Multer } from "multer";

export class managementServiceController {
  static async addService(req: Request, res: Response) {
    try {
      const { service } = req.body;
      if (!service || typeof service !== "object") {
        return res.json({ message: "service phải là object" });
      }
      const { type_id } = service;
      let createService = {};
      switch (type_id) {
        case ServiceType.HOTEL:
          createService = await HotelService.getInstance().createService(
            service
          );
          break;
        case ServiceType.RENTAL_CAR:
          createService = await RentalCarService.getInstance().createService(
            service
          );
          break;
        case ServiceType.THING_TO_DO:
          createService = await ThingToDoService.getInstance().createService(
            service
          );
          break;
      }

      return res.json(createService)
    } catch (error) {
      console.error("error", error)
      return res.json(error)
    }
  }

  static async updateService(req: Request, res: Response) {
    try {
      const { service, amenitiesHotel } = req.body;
      if (!service || typeof service !== "object") {
        return res.json({ message: "service phải là object" });
      }

      if (!amenitiesHotel || !Array.isArray(amenitiesHotel)) {
        return res.json({ message: "Amenities phải là Array" });
      }

      const update = await ManagementService.updateService(service);

      return {
        update,
      };
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateImage(req: Request, res: Response) {
    try {
      const { data } = req.body
      
      if(!data){
        return
      }

      const {service_id, delete_image} =JSON.parse(data)

      const imageFiles = (req.files as any)?.imageFiles as Express.Multer.File[] | undefined;

      if (!service_id || String(service_id).trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Thiếu service_id",
        });
      }

      let deleteImageIds: string[] = [];

      if (delete_image) {
        if (Array.isArray(delete_image)) {
          deleteImageIds = delete_image.map(String).filter(id => id.trim() !== "");
        } else if (typeof delete_image === "string" && delete_image.trim() !== "") {
          deleteImageIds = [delete_image.trim()];
        }
      }

      const hasNewImages = imageFiles && imageFiles.length > 0;
      const hasDelete = deleteImageIds.length > 0;

      if (!hasNewImages && !hasDelete) {
        return res.status(400).json({
          success: false,
          message: "Không có thay đổi về hình ảnh",
        });
      }

      const result = await ManagementService.updateImages(
        service_id as string,
        imageFiles || [],
        deleteImageIds
      );

      return res.status(200).json({
        success: true,
        message: "Cập nhật ảnh thành công",
        data: result,
      });

    } catch (error: any) {
      console.error("Lỗi trong updateImage controller:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Lỗi server khi cập nhật ảnh",
      });
    }
  }


}
