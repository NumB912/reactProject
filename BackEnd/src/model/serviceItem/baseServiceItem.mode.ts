import type { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import type { ErrorResponse, SuccessResponse } from "../api.model";
import type { ServiceItem } from "@prisma/client";



export interface BaseServiceItemInterface {
  getListItemService(
    type: ServiceItemTypeEnum,
    service_id:string,
  ): Promise<any | SuccessResponse<ServiceItem> | ErrorResponse>;
  createItemService(
    serviceItem: ServiceItem
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse>;
  updateItemService(
    serviceItem: ServiceItem
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse>;
  deleteItemService(service_item_id: string): Promise<{
    success: boolean;
    message: string;
    status: number;
  }>;
}