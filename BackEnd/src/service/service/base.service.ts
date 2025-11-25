import prisma from "@/db";
import type { TypeService } from "@/enum/service/type.service.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { BaseServiceInterface } from "@/model/service/base.service.model";
import type { ServiceModel } from "@/model/service.model";
import type {Service as ServiceClient} from '@prisma/client'
import type { ServiceDetail } from "@/model/type.service.detail.model";
import type { Decimal } from "@prisma/client/runtime/library";

export abstract class BaseService implements BaseServiceInterface {
  
  async deleteService(
    service_id: string
  ): Promise<{ success: boolean; message: string; status: number }> {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        const deleteService = await tx.service.delete({
          where: {
            id: service_id,
          },
        });

        return deleteService;
      });

      return {
        success: true,
        message: "Xóa thành công dịch vụ",
        status: 200,
      };
    } catch (error) {
      console.error("Lỗi trong quá trình xóa vui lòng thử lại", error);

      return {
        success: false,
        message: "Lỗi trong quá trình xóa",
        status: 500,
      };
    }
  }

  async getListServices(
    type: TypeService
  ): Promise<
    | SuccessResponse<ServiceModel[]>
    | ErrorResponse
  > {
    try {
      const listService = await prisma.service.findMany({
        where: {
          service_type_id: type,
        },
        select: {
          info: true,
          service_name: true,
          supplier_id: true,
          rating: true,
          total_reviews: true,
          create_at: true,
          update_at: true,
          description: true,
          location_id: true,
          service_type_id: true,
          status_id: true,
          price_from: true,
          price_to: true,
        },
      });

      return {
        data: listService,
        message: "Thành công",
        status: 200,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: "Lỗi không thể lấy được dịch vụ",
        status: 500,
      };
    }
  }

  abstract createService(service: ServiceClient): Promise<
    | SuccessResponse<ServiceClient>
    | ErrorResponse
  >;
  abstract getDetailService(
    serviceId: string
  ): Promise<
    | SuccessResponse<ServiceDetail>
    | ErrorResponse
  >;

  abstract updateService(service: ServiceClient): Promise<
    | SuccessResponse<ServiceClient>
    | ErrorResponse
  >;
}
