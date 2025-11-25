// src/services/HotelService.ts
import prisma from "@/db";
import type { BaseServiceInterface } from "../../model/service/base.service.model";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { Service  } from "@prisma/client";
import type { RentalCarServiceModel } from "@/model/service.model";
import { BaseService } from "./base.service";
import { Decimal } from "@prisma/client/runtime/library";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { ServiceDetail } from "@/model/type.service.detail.model";

export class RentalCarService extends BaseService {
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
      
      include:{
        amenities_hotels:true,
        type_service:true,
        imageServices:true,
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
    service: RentalCarServiceModel
  ): Promise<
    | SuccessResponse<Service>
    | ErrorResponse
  > {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
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
            total_reviews: service.total_reviews != null ? Number(service.total_reviews) : undefined,
            create_at:service.create_at,
            update_at:service.update_at
          },
        });

        return createRentalCar;
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
    service: Service
  ): Promise<
    | { success: true; data: Service; message: string; status: number }
    | { success: false; message: string; status: number }
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
