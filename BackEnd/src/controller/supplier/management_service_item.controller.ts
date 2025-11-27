import { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import { ManagementServiceItem } from "@/service/management-service-item.ts/management_service_item.service";
import { AmenitesCarService } from "@/service/service_item/amennitiesServiceItem/amenitesCar.service";
import { CarService } from "@/service/service_item/car.service";
import { RoomService } from "@/service/service_item/room.service";
import { ServiceItemService } from "@/service/service_item/service_item.service";
import { TourService } from "@/service/service_item/tour.service";
import type { Request, Response } from "express";

export class ManagementServiceItemController {
  static async addServiceItem(req: Request, res: Response) {
    try {
      const { service_item, ChangeAmenity, changeImage } = req.body;
      if (!service_item || typeof service_item !== "object") {
        return res.json({ message: "service phải là object" });
      }
      console.log(ChangeAmenity);

      const create_item_service = await ManagementServiceItem.addService(
        service_item,
        ChangeAmenity,
        changeImage
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
      const { service_item, delete_image, ChangeAmenity } = req.body;
      const imageFiles = (req.files as any)?.imageFiles as
        | Express.Multer.File[]
        | undefined;

      if (!service_item || typeof service_item !== "object") {
        return res.json({ message: "service phải là object" });
      }
      const uploadServiceItem = ManagementServiceItem.updateServiceItem(
        service_item,
        ChangeAmenity,
        imageFiles,
        delete_image
      );
      return {
        uploadServiceItem,
      };
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
