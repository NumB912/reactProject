import { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import { CarService } from "@/service/service_item/car.service";
import { RoomService } from "@/service/service_item/room.service";
import {TourService } from "@/service/service_item/tour.service";
import type { Request, Response } from "express";

export class ManagementServiceItemController {
  static async addServiceItem(req: Request, res: Response) {
    try {
      const { service_item } = req.body;
      if (!service_item || typeof service_item !== "object") {
        return res.json({ message: "service phải là object" });
      }

      const { type_id } = service_item;
      let create_item_service = {};
      switch (type_id) {
        case ServiceItemTypeEnum.ROOM:
          create_item_service = await RoomService.getInstance().createItemService(
            service_item
          );
          break;
        case ServiceItemTypeEnum.CAR:
          create_item_service = await CarService.getInstance().createItemService(
            service_item
          )
          break;
        case ServiceItemTypeEnum.TOUR:
          create_item_service = await TourService.getInstance().createItemService(
             service_item
          )
          break;
      }

      return res.json({
        create_item_service,
      });
    } catch (error) {
      console.error("error", error);
    }
  }

   static async updateServiceItem(req: Request, res: Response) {
    try {
      const { service_item } = req.body;
      if (!service_item || typeof service_item !== "object") {
        return res.json({ message: "service phải là object" });
      }
      const { type } = service_item;
      let create_item_service = {};
      switch (type) {
        case ServiceItemTypeEnum.ROOM:
          create_item_service = await RoomService.getInstance().updateItemService(
            service_item
          );
          break;
        case ServiceItemTypeEnum.CAR:
          create_item_service = await CarService.getInstance().updateItemService(
            service_item
          )
          break;
        case ServiceItemTypeEnum.TOUR:
          create_item_service = await TourService.getInstance().updateItemService(
             service_item
          )
          break;
      }

      return {
        create_item_service,
      };
    } catch (error) {
      console.error("error", error);
    }
  }

  static async deleteServiceItem(req:Request,res:Response){
    
  }

}
