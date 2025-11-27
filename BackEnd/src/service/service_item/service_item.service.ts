import prisma from "@/db";
import type { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { BaseServiceItemInterface } from "@/model/serviceItem/baseServiceItem.mode";
import type { Service, ServiceItem } from "@prisma/client";

export abstract class ServiceItemService implements BaseServiceItemInterface {
  abstract getListItemService(
    service_id: string
  ): Promise<SuccessResponse<any[]> | ErrorResponse>;
  abstract createItemService(
    service_item: ServiceItem
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse>;
  abstract updateItemService(
    service_item: ServiceItem
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse>;
  async deleteItemService(
    service_id: string
  ): Promise<SuccessResponse<boolean> | ErrorResponse> {
    try {
      await prisma.serviceItem.delete({
        where: {
          id: service_id,
        },
      });

      return {
        data: true,
        status: 500,
        success: true,
        message: "lỗi không thế thực hiện ",
      };
    } catch (error) {
      console.error("Lỗi trong quá trình xóa dịch vụ");
      return {
        success: false,
        message: "Lỗi trong quá trình xóa dịch vụ",
        status: 500,
      };
    }
  }
}
