// src/services/HotelService.ts
import prisma from "@/db";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { Service } from "@prisma/client";
import type {
  HotelServiceModel,
  ServiceModel,
} from "@/model/service/service.model";
import { BaseService } from "./base.service";
import { Decimal } from "@prisma/client/runtime/library";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";

export class HotelService extends BaseService {
  private static instance: HotelService;

  constructor() {
    super();
  }

  async getListServices(): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const list = await prisma.service.findMany({
        select: {
          amenities_hotels: {
            select: {
              amenity: true,
            },
          },
          id:true,
          service_name: true,
          price_from: true,
          price_to: true,
          rating: true,
          total_reviews: true,
          type_hotel_id: true,
          typeHotel: {
            select: {
              type: true,
            },
          },
          imageServices: {
            select: {
              image: true,
            },
          },
        },

        where: {
          service_type_id: ServiceType.HOTEL,
        },
      });

      return {
        data: list,
        message: "Thành công",
        status: 200,
        success: true,
      };
    } catch (error) {
      console.error();
      return {
        status: 500,
        message: "Lỗi",
        success: false,
      };
    }
  }

  public static getInstance(): HotelService {
    if (!HotelService.instance) {
      HotelService.instance = new HotelService();
    }
    return this.instance;
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
            amenitiesRooms:{
              include:{
                amenityRoom:true,
              }
            },
            imagesRooms:true,
            availiable_from:true,
            availiable_to:true,
            area:true,
            max_people:true,
            serviceItemOccasions:{
              select:{
                day:true,
                price_occassion:true,
              }
            },
            serviceItemOffs:{
              select:{
                date_off:true,
              }
            }
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
    service: HotelServiceModel
  ): Promise<SuccessResponse<Service> | ErrorResponse> {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        const createHotel = await tx.service.create({
          data: {
            service_name: service.service_name,
            info: service.info,
            status_id: service.status_id,
            rating: 0.0,
            service_type_id: ServiceType.HOTEL,
            quantity_room: service.quantity_room,
            description: service.description,
            type_hotel_id: service.type_hotel_id,
            location_id: service.location_id,
            supplier_id: service.supplier_id || "",
            price_from: service.price_from || Decimal(0),
            price_to: service.price_to || Decimal(0),
            total_reviews: 0,
            create_at: service.create_at || new Date(),
            update_at: service.update_at || new Date(),
          },
        });

        return createHotel;
      });

      return {
        success: true,
        message: "thành công",
        status: 200,
        data: transaction,
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
    service: HotelServiceModel
  ): Promise<
      | ErrorResponse
    | SuccessResponse<Service>
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
            type_hotel_id: service.type_hotel_id,
            service_name: service.service_name,
            quantity_room: service.quantity_room,
            info: service.info,
            rating: service.rating,
            update_at: Date.now().toString(),
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
    service_id: string
  ): Promise<{ success: boolean; message: string; status: number }> {
    try {
      const deleteHotel = await super.deleteService(service_id);

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
