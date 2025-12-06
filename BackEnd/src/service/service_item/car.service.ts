import type { Prisma, Service, ServiceItem } from "@prisma/client";
import { ServiceItemService } from "./service_item.service";
import prisma from "@/db";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import type {
  CarModel,
  RoomModel,
} from "@/model/serviceItem/serviceItem.model";
import type { SearchQueryServiceItem } from "@/controller/service.controller";

export class CarService extends ServiceItemService {
  async getBookingServiceItem(service_id: string, service_item_id: string): Promise<SuccessResponse<any> | ErrorResponse> {
    throw new Error("Method not implemented.");
  }
  private static instance: CarService;
  constructor() { 
    super();
  }
  public static getInstance(): CarService {
    if (!CarService.instance) {
      CarService.instance = new CarService();
    }

    return this.instance;
  }

  async getListItemService(
      param:SearchQueryServiceItem
  ): Promise<SuccessResponse<any[]> | ErrorResponse> {
    try {

      const service_id = param.service_id


      const getCarList = await prisma.serviceItem.findMany({
        where: {
          service_id: service_id,
        },

        select: {
          name: true,
          availiable_from: true,
          availiable_to: true,
          area: true,
          max_people: true,
          amenitiesCars: {
            select: {
              amenity: true,
            },
          },
          price: true,
          status_id: true,
          tranmission: {
            select: {
              transmission: true,
            },
          },

          serviceItemOccasions: {
            select: {
              price_occassion: true,
              day: true,
            },
          },

          serviceItemOffs: {
            select: {
              date_off: true,
            },
          },
        },
      });

      return {
        data: getCarList,
        message: "Thành công",
        status: 200,
        success: true,
      };
    } catch (error) {
      console.error("Lỗi trong quá trình thưc thi", error);

      return {
        message: "Lỗi không tồn tại dịch vụ",
        status: 500,
        success: false,
      };
    }
  }

  async updateItemService(
    service_item: CarModel,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const createCar = await tx.serviceItem.update({
        where: {
          id: service_item.id,
        },
        data: {
          service_id: service_item.service_id,
          availiable_from: service_item.availiable_from,
          availiable_to: service_item.availiable_to??null,
          name: service_item.name,
          price: service_item.price,
          status_id: service_item.status_id,
          type_id: service_item.type_id,
          transmission_id: service_item.transmission_id,
          car_type_id: service_item.car_type_id,
          quantity:service_item.quantity,
        },
      });

      return {
        data: createCar,
        message: "Sửa thành công",
        status: 200,
        success: true,
      };
    } catch (error) {
      console.error("Lỗi trong quá trình thực hiện", error);

      return {
        success: false,
        message: "Lỗi trong quá trình thực hiện",
        status: 500,
      };
    }
  }

  async createItemService(
    service_item: CarModel,
    
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse> {
    try {
        const createCar = await tx.serviceItem.create({
          data: {
            service_id: service_item.service_id,
            availiable_from: service_item.availiable_from,
            availiable_to: service_item.availiable_to,
            name: service_item.name,
            price: service_item.price,
            status_id: service_item.status_id,
            type_id: service_item.type_id,
            car_type_id: service_item.car_type_id,
            transmission_id: service_item.transmission_id,
            quantity:service_item.quantity??0
          },
        });

      return {
        data: createCar,
        status: 500,
        success: true,
        message: "Hoàn thành",
      };
    } catch (error) {
      console.error("Lỗi trong quá trình tạo dịch vụ", error);
      return {
        success: false,
        message: "Lỗi trong quá trình tạo dịch vụ",
        status: 500,
      };
    }
  }

  async deleteItemService(
    service_id: string,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<boolean> | ErrorResponse> {
    try {
      const deleteServiceItem = await super.deleteItemService(service_id, tx);
      return deleteServiceItem;
    } catch (error) {
      console.error("Erorr:", error);
      return {
        success: false,
        message: "Lỗi trong quá trình thực hiện",
        status: 500,
      };
    }
  }
}
