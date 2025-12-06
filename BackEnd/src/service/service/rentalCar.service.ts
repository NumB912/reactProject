// src/services/HotelService.ts
import prisma from "@/db";
import type { BaseServiceInterface, ParamRentalCar } from "../../model/service/baseService.model";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { Prisma, Service  } from "@prisma/client";
import type { RentalCarServiceModel } from "@/model/service/service.model";
import { BaseService } from "./base.service";
import { Decimal } from "@prisma/client/runtime/library";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { ServiceDetail } from "@/model/type.service.detail.model";

export class RentalCarService extends BaseService {
 async getListServices(param:ParamRentalCar): Promise<SuccessResponse<any[]> | ErrorResponse> {
        try{
      const list = await prisma.service.findMany({
        select:{
          imageServices:true,
          service_name:true,
          price_from:true,
          price_to:true,
          rating:true,
          total_reviews:true,
        },

        where:{
          service_type_id:ServiceType.RENTAL_CAR,
        }
      })

      return {
        data:list,
        message:"Thành công",
        status:200,
        success:true,
      }
    }catch(error){
      console.error()
      return {
        status:500,
        message:"Lỗi",
        success:false,
      }
    }
  }
  private static instance: RentalCarService;

  constructor() {
    super();
  }

  public static getInstance(): RentalCarService {
    if (!RentalCarService.instance) {
      RentalCarService.instance = new RentalCarService();
    }
    return RentalCarService.instance;
  }

  async getDetailService(
    serviceId: string
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    const hotel = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
        select:{
        amenities_hotels:{
          select:{
            amenity:true,
          }
        }
        ,
        description:true,
        info:true,
        imageServices:true,
        price_from:true,
        price_to:true,
        rating:true,
        location:true,
        total_reviews:true,
        reviews:{
          select:{
            content:true,
            person:{
              select:{
                name:true,
              }
            },
            create_at:true,
            update_at:true,
            rating:true,
            parent:{
              select:{
                parent_id:true,
              }
            }
          }
        },

        service_name:true,
        serviceItems:{
          select:{
            name:true,
            type_id:true,
            availiable_from:true,
            availiable_to:true,
            amenitiesCars:{
              include:{
                amenity:true,
              }
            },
        
          }
        }

      }

    });

    if (!hotel) {
      return {
        success: false,
        message: "Không tìm thấy khách sạn",
        status: 404,
      };
    }

    return {
      data: hotel,
      message: "Hoàn thành",
      status: 200,
      success: true,
    };
  }

  async createService(
    service: RentalCarServiceModel,
    tx:Prisma.TransactionClient
  ): Promise<
    | SuccessResponse<Service>
    | ErrorResponse
  > {
    try {
        const createRentalCar = await tx.service.create({
          data: {
            service_name: service.service_name,
            info: service.info,
            status_id: service.status_id,
            rating: service.rating,
            service_type_id: ServiceType.RENTAL_CAR,
            quantity_room: null,
            description: service.description,
            location_id: service.location_id,
            supplier_id: service.supplier_id || "",
            price_from: service.price_from || Decimal(0),
            price_to: service.price_to || Decimal(0),
            total_reviews: service.total_reviews||0,
               createdAt:service.create_at||new Date(),
            updatedAt:service.update_at||new Date()
          },
        });
      return {
        success: true,
        message: "thành công",
        status: 200,
        data: createRentalCar,
      };
    } catch (error) {
      console.error("Lỗi trong quá trình thực thi", error);
      return {
        message: "Lỗi trong quá trình tạo ",
        status: 500,
        success: false,
      };
    }
  }

  async updateService(
    service: RentalCarServiceModel
  ): Promise<
    | SuccessResponse<Service>
    | ErrorResponse
  > {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        const updateService = await tx.service.update({
          where: {
            id: service.id,
          },
          data: {
            supplier_id: service.supplier_id,
            location_id: service.location_id,
            service_name: service.service_name,
            info: service.info,
            rating: service.rating,
            updatedAt: Date.now().toString(),
            status_id: service.status_id,
          },
        });
        return updateService;
      });

      return {
        success: true,
        message: "Done",
        status: 200,
        data: transaction,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: "Thất bại",
      };
    }
  }

  async deleteService(
    service_id: string,
    tx:Prisma.TransactionClient
  ): Promise<{ success: boolean; message: string; status: number }> {
    try {
      const deleteHotel = await super.deleteService(service_id,tx);

      return deleteHotel;
    } catch (error) {
      console.error("Lỗi trong quá trình xóa vui lòng thử lại", error);

      return {
        success: false,
        message: "Lỗi trong quá trình xóa",
        status: 500,
      };
    }
  }
}
