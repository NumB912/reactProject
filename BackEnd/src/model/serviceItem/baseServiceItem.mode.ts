import type { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import type { ErrorResponse, SuccessResponse } from "../api.model";
import type { Prisma, ServiceItem } from "@prisma/client";
import type { SearchQueryServiceItem } from "@/controller/service.controller";

export interface BaseServiceItemInterface {
  getListItemService(
    params: SearchQueryServiceItem
  ): Promise<any | SuccessResponse<ServiceItem> | ErrorResponse>;
  createItemService(
    serviceItem: ServiceItem,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse>;
  updateItemService(
    serviceItem: ServiceItem,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse>;
  getBookingServiceItem(
    service_id: string,
    service_item_id: string
  ): Promise<SuccessResponse<any> | ErrorResponse>;
  deleteItemService(
    service_item_id: string,
    tx: Prisma.TransactionClient
  ): Promise<{
    success: boolean;
    message: string;
    status: number;
  }>;
}
