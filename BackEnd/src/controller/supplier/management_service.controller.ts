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
      const { service } = req.body;
      if (!service || typeof service !== "object") {
        return res.json({ message: "service phải là object" });
      }
      console.log(service)
      const createService = await ManagementService.addService(service);

      return res.json(createService);
    } catch (error) {
      console.error("error", error);
      return res.json(error);
    }
  }

  static async updateService(req: Request, res: Response) {
    try {
      const { data } = req.body;
      const {service, amenities_hotel, image_change} = JSON.parse(data)
      const imageFiles = (req.files as any)?.imageFiles as
        | Express.Multer.File[]
        | undefined;
      if (!service || typeof service !== "object") {
        return res.json({ message: "service phải là object" });
      }

      if (!amenities_hotel || !Array.isArray(amenities_hotel)) {
        return res.json({ message: "Amenities phải là Array" });
      }

      if (!image_change || !Array.isArray(image_change)) {
        return res.json({ message: "Image phải là Array" });
      }

      const updateServiceManagement = await ManagementService.updateService(
        service,
        image_change,
        amenities_hotel,
        imageFiles
      );

      return res.json({
        updateServiceManagement,
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  // static async updateImage(req: Request, res: Response) {
  //   try {
  //     const { data } = req.body;
  //     if (!data) {
  //       return;
  //     }

  //     const { service_id, amenities_hotel } = JSON.parse(data);

  //     const imageFiles = (req.files as any)?.imageFiles as
  //       | Express.Multer.File[]
  //       | undefined;

  //     if (!service_id || String(service_id).trim() === "") {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Thiếu service_id",
  //       });
  //     }

  //     let deleteImageIds: string[] = [];

  //     const hasNewImages = imageFiles && imageFiles.length > 0;
  //     const hasDelete = deleteImageIds.length > 0;

  //     if (!hasNewImages && !hasDelete) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Không có thay đổi về hình ảnh",
  //       });
  //     }

  //     const result = await ManagementService.updateImages(
  //       service_id as string,
  //       imageFiles || [],
  //       amenities_hotel
  //     );

  //     return res.status(200).json({
  //       success: true,
  //       message: "Cập nhật ảnh thành công",
  //       data: result,
  //     });
  //   } catch (error: any) {
  //     console.error("Lỗi trong updateImage controller:", error);

  //     return res.status(500).json({
  //       success: false,
  //       message: error.message || "Lỗi server khi cập nhật ảnh",
  //     });
  //   }
  // }

  // static async ChangeAmenity(req: Request, res: Response) {
  //   const { service_id, change_amenity } = req.body;

  //   if (!service_id || !Array.isArray(change_amenity)) {
  //     return res.status(400).json({ message: "Invalid input" });
  //   }

  //   try {
  //     await ManagementAmenityHotel.EditAmenityHotelService(
  //       service_id,
  //       change_amenity
  //     );
  //     return res
  //       .status(200)
  //       .json({ message: "Amenities updated successfully" });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: "Failed to update amenities" });
  //   }
  // }
}
