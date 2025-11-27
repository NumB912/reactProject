import type { Service, ServiceItem } from "@prisma/client";
import { ServiceItemService } from "./service_item.service";
import prisma from "@/db";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { TourModel } from "@/model/serviceItem/serviceItem.model";

export class TourService extends ServiceItemService {
  getListItemService(service_id: string): Promise<SuccessResponse<any[]> | ErrorResponse> {
    throw new Error("Method not implemented.");
  }

 private static instance:TourService;
  constructor(){
    super()
  }
  public static getInstance():TourService{
    if(!TourService.instance){
       TourService.instance = new TourService()
    }

    return this.instance
  }

  async updateItemService(
    service_item: TourModel
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const transaction = await prisma.$transaction(async (ts) => {
        const createRoom = await ts.serviceItem.update({
          where:{
            id:service_item.id
          },
          data: {
            service_id: service_item.service_id,
            availiable_from: service_item.availiable_from,
            availiable_to: service_item.availiable_to,
            name: service_item.name,
            price: service_item.price,
            status_id: service_item.status_id,
            type_id: service_item.type_id,
            duration:service_item.duration,
            
          },
        });

        return createRoom;
      });

      return {
        data:transaction,
        message:"Sửa thành công",
        status:200,
        success:true,
      }
    } catch (error) {
      console.error("Lỗi trong quá trình thực hiện",error);

      return {
        success:false,
        message:"Lỗi trong quá trình thực hiện",status:500
      }
    }
  }

  async createItemService(
    service_item: TourModel
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse> {
    try {
      const transaction = await prisma.$transaction(async (ts) => {
        const createTour = await ts.serviceItem.create({
          data: {
            service_id: service_item.service_id,
            availiable_from: service_item.availiable_from,
            availiable_to: service_item.availiable_to,
            name: service_item.name,
            price: service_item.price,
            status_id: service_item.status_id,
            type_id: service_item.type_id,
            duration:service_item.duration
          },
        });

        return createTour;
      });

      return {
        data: transaction,
        status: 500,
        success: true,
        message: "Hoàn thành",
      };
    } catch (error) {
      console.error("Lỗi trong quá trình tạo dịch vụ");
      throw Error("Lỗi trong quá trình tạo dịch vụ")
    }
  }

  async deleteServiceItem(
    service_id: string
  ): Promise<SuccessResponse<boolean> | ErrorResponse> {
    try {
      const deleteServiceItem = await super.deleteItemService(service_id);
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
