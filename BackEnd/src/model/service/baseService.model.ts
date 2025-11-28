import prisma from "@/db";
import { StatusType } from "@/enum/service/status.service.enum";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { Prisma, Service } from "@prisma/client";
import type { ErrorResponse, SuccessResponse } from "../api.model";
import type { ServiceDetail } from "../type.service.detail.model";

export interface GetListServicesParams {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: "service_name" | "rating" | "createdAt" | "price_from";
  sortOrder?: "asc" | "desc";
  type_id?: ServiceType;
  priceTo?: string;
  priceFrom?: string;

  amenities_hotel?: string[];
  type_hotel?: string[];
  amenities_room?:string[],

  duration?: string[];

  tranmission?: string[];
  type_car?: string[];
  number_passenger?: string;
  amenities_car?:string[];
}

export interface BaseServiceInterface {
  getListServices(
    params: GetListServicesParams
  ): Promise<any | SuccessResponse<Service> | ErrorResponse>;
  getDetailService(serviceId: string): Promise<
    | ServiceDetail
    | {
        success: boolean;
        message: string;
        status: number;
      }
  >;
  createService(
    service: Service,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<Service> | ErrorResponse>;
  updateService(
    service: Service,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<Service> | ErrorResponse>;
  deleteService(
    service_id: string,
    tx: Prisma.TransactionClient
  ): Promise<{
    success: boolean;
    message: string;
    status: number;
  }>;
}
