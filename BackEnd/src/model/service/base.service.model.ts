import prisma from "@/db";
import { StatusType } from "@/enum/service/status.service.enum";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { Service } from "@prisma/client";
import type { ErrorResponse, SuccessResponse } from "../api.model";
import type { ServiceDetail } from "../type.service.detail.model";

export interface BaseServiceInterface {
  getListServices(
    type: ServiceType
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
    service: Service
  ): Promise<SuccessResponse<Service> | ErrorResponse>;
  updateService(
    service: Service
  ): Promise<SuccessResponse<Service> | ErrorResponse>;
  deleteService(service_id: string): Promise<{
    success: boolean;
    message: string;
    status: number;
  }>;
}
