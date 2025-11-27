import prisma from "@/db";
import type { ServiceType } from "@/enum/service/type.service.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { BaseServiceInterface, GetListServicesParams } from "@/model/service/baseService.model";
import type { ServiceModel } from "@/model/service/service.model";
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

  abstract getListServices(params:GetListServicesParams): Promise<
    | SuccessResponse<any[]>
    | ErrorResponse
  > 

  abstract createService(service: any): Promise<
    | SuccessResponse<ServiceClient>
    | ErrorResponse
  >;
  abstract getDetailService(
    serviceId: string
  ): Promise<
    | SuccessResponse<ServiceDetail>
    | ErrorResponse
  >;

  abstract updateService(service: any): Promise<
    | SuccessResponse<ServiceClient>
    | ErrorResponse
  >;
}
