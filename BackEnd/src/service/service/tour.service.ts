import prisma from "@/db";
import type {
  BaseServiceInterface,
  GetListServicesParams,
} from "../../model/service/baseService.model";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { Service } from "@prisma/client";
import { BaseService } from "./base.service";
import { Decimal } from "@prisma/client/runtime/library";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { ServiceDetail } from "@/model/type.service.detail.model";
import type { ThingToDoServiceModel } from "@/model/service/service.model";

export class ThingToDoService extends BaseService {
  private static instance: ThingToDoService;

  constructor() {
    super();
  }

  public static getInstance(): ThingToDoService {
    if (!ThingToDoService.instance) {
      ThingToDoService.instance = new ThingToDoService();
    }
    return ThingToDoService.instance;
  }

  async getListServices(params: GetListServicesParams): Promise<any> {
    try {
      const page = Number(params.page) || 1;
      const limit = Math.min(Number(params.limit) || 10, 50);
      const search = params.search?.trim() || "";
      const sortBy = params.sortBy || "create_at";
      const sortOrder = params.sortOrder === "asc" ? "asc" : "desc";

      const skip = (page - 1) * limit;
      const where: any = {
        service_type_id: ServiceType.THING_TO_DO,
      };

      if (search) {
        where.OR = [
          { service_name: { contains: search, mode: "insensitive" } },
        ];
      }

      const [list, total] = await Promise.all([
        prisma.service.findMany({
          where,
          select: {
            id: true,
            service_name: true,
            price_from: true,
            price_to: true,
            rating: true,
            total_reviews: true,
            imageServices: {
              select: {
                image: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: limit,
        }),

        prisma.service.count({ where }),
      ]);

      return {
        success: true,
        status: 200,
        message: "Thành công",
        data: {
          list,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page <= total - 1,
            hasPrev: page - 1 > 0,
          },
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        status: 500,
        message: "Lỗi server",
      };
    }
  }
  async getDetailService(
    serviceId: string
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    const hotel = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
      select: {
        service_name: true,
        info: true,
        location: true,
        price_from: true,
        rating: true,
        reviews: true,
        description: true,
        total_reviews: true,
        service_type_id: true,
        serviceItems: {
          select: {
            duration: true,
            price: true,
            name: true,
            availiable_from: true,
            availiable_to: true,
            serviceItemOccasions: true,
            serviceItemOffs: true,
          },
        },
        imageServices: true,
        supplier: {
          select: {
            phone: true,
            name: true,
          },
        },
      },
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
    service: ThingToDoServiceModel
  ): Promise<SuccessResponse<Service> | ErrorResponse> {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        const createThingToDo = await tx.service.create({
          data: {
            service_name: service.service_name,
            info: service.info,
            status_id: service.status_id,
            rating: 0.0,
            service_type_id: ServiceType.THING_TO_DO,
            description: service.description,
            location_id: service.location_id,
            supplier_id: service.supplier_id || "",
            price_from: service.price_from || Decimal(0),
            price_to: service.price_to || Decimal(0),
            total_reviews: 0,
            createdAt: service.create_at || new Date(),
          },
        });

        return createThingToDo;
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
    service: ThingToDoServiceModel
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
            service_name: service.service_name,
            info: service.info,
            rating: service.rating,
            updatedAt: Date.now().toString(),
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
