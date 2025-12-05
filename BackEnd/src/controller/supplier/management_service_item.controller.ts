import { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import { ManagementServiceItem } from "@/service/management-service-item.ts/management_service_item.service";
import { AmenitesCarService } from "@/service/service_item/amennitiesServiceItem/amenitesCar.service";
import { CarService } from "@/service/service_item/car.service";
import { RoomService } from "@/service/service_item/room.service";
import { ServiceItemService } from "@/service/service_item/service_item.service";
import { TourService } from "@/service/service_item/tour.service";
import type { Request, Response } from "express";
import type multer from "multer";

export class ManagementServiceItemController {
  static async addServiceItem(req: Request, res: Response) {
    try {
      const { data } = req.body;
      console.log(data)
      if(!data){
        return
      }

      const {service_item, change_amenity} = JSON.parse(data)
      const imageFiles = (req.files as any)?.imageFiles as
        | Express.Multer.File[]
        | undefined;

      if (!service_item || typeof service_item !== "object") {
        return res.json({ message: "service phải là object" });
      }

      const create_item_service = await ManagementServiceItem.addServiceItem(
        service_item,
        change_amenity,
        imageFiles
      );

      return res.json({
        create_item_service,
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateServiceItem(req: Request, res: Response) {
    try {
      const {data} = req.body

      if(!data){
        return
      }

      const { service_item, delete_image, change_amenity } = JSON.parse(data);
      const imageFiles = (req.files as any)?.imageFiles as
        | Express.Multer.File[]
        | undefined;
      if (!service_item || typeof service_item !== "object") {
        return res.json({ message: "service phải là object" });
      }
      const uploadServiceItem = await ManagementServiceItem.updateServiceItem(
        service_item,
        change_amenity,
        imageFiles,
        delete_image
      );
      return res.json({
        uploadServiceItem
      })
    } catch (error) {
      console.error("error", error);
    }
  }

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
