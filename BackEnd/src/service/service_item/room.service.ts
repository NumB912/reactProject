import type { Prisma, Service, ServiceItem } from "@prisma/client";
import { ServiceItemService } from "./service_item.service";
import prisma from "@/db";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import type { RoomModel } from "@/model/serviceItem/serviceItem.model";
export class RoomService extends ServiceItemService {

  private static instance:RoomService;
  constructor(){
    super()
  }
  public static getInstance():RoomService{
    if(!RoomService.instance){
       RoomService.instance = new RoomService()
    }

    return this.instance
  }
  
  async getListItemService( service_id: string): Promise<SuccessResponse<any[]> | ErrorResponse> {
      try{

        const getRoomList = await prisma.serviceItem.findMany({
          where:{
            service_id:service_id,
          },

          select:{
            name:true,
            availiable_from:true,
            availiable_to:true,
            area:true,
            imageServiceItems:{
              select:{
                image:true
              }
            },
            price:true,
            max_people:true,
            status_id:true,
            amenitiesRooms:{
              select:{
                amenityServiceItems:{
                  select:{
                    amenity:true
                  }
                },
              }
            },
            serviceItemOccasions:{
              select:{
                price_occassion:true,
                day:true,
              }
            },

            serviceItemOffs:{
              select:{date_off:true,}
            }
            
          },
        })

      return {
        data:getRoomList,
        message:"Thành công",
        status:200,
        success:true,
      }

      }catch(error){
        console.error("Lỗi trong quá trình thưc thi",error)

        return {
          message:"Lỗi không tồn tại dịch vụ",
          status:500,
          success:false
        }
      }
  }

  async updateItemService(
    service_item: RoomModel,
    tx:Prisma.TransactionClient
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
        const updateRoom= await tx.serviceItem.update({
          where:{
            id:service_item.id
          },
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


      return {
        data:updateRoom,
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
    service_item: RoomModel,
    tx:Prisma.TransactionClient
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse> {
    try {
   
        const createRoom = await tx.serviceItem.create({
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

      return {
        data: createRoom,
        status: 500,
        success: true,
        message: "Hoàn thành",
      };
    } catch (error) {
      console.error("Lỗi trong quá trình tạo dịch vụ",error);
      return {
        success: false,
        message: "Lỗi trong quá trình tạo dịch vụ",
        status: 500,
      };
    }
  }

  async deleteItemService(
    service_id: string,
    tx:Prisma.TransactionClient
  ): Promise<SuccessResponse<boolean> | ErrorResponse> {
    try {
      const deleteServiceItem = await super.deleteItemService(service_id,tx);
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
