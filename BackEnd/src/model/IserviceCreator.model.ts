import type { Prisma, Service } from "@prisma/client";
import type { Service as ServiceType } from "@prisma/client";

type SuccessResponse<T> = {
  success: true;
  message:string,
  status:number,
  data: T;
};

type ErrorResponse = {
  success: false;
  message: string;
  status: number;
};

export interface IServiceCreator {
  create(
    service: ServiceType,
    tx:Prisma.TransactionClient
  ): Promise<
    SuccessResponse<Service>|ErrorResponse
  >;
}
