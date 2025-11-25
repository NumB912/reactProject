import type { ServiceItem } from "@prisma/client";
import { ServiceItemService } from "./service_item.service";
import prisma from "@/db";

export class RoomService extends ServiceItemService {
  async createServiceItem(service_item: ServiceItem) {
    try {
      const transaction = await prisma.$transaction(async (ts) => {
        const createRoom = await ts.serviceItem.create({
          data: {
            area: service_item.area,
            room_type_id: service_item.room_type_id,
            max_people: service_item.max_people,
            service_id: service_item.service_id,
            availiable_from: service_item.availiable_from,
            availiable_to: service_item.availiable_to,
            name: service_item.name,
            price: service_item.price,
            status_id: service_item.status_id,
            type_id: service_item.type_id,
          },
        });

        return createRoom;
      });

      return transaction;
    } catch (error) {
      console.error("Lỗi trong quá trình tạo dịch vụ");
      return {
        sucesss: true,
        message: "Lỗi trong quá trình tạo dịch vụ",
        status: 500,
      };
    }
  }

  async updateServiceItem(service_item: ServiceItem) {
    
  }
}
