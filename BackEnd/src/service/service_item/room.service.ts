import type { Prisma, Service, ServiceItem } from "@prisma/client";
import { ServiceItemService } from "./service_item.service";
import prisma from "@/db";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import type { RoomModel } from "@/model/serviceItem/serviceItem.model";
import type { SearchQueryServiceItem } from "@/controller/service.controller";
import { toISODate } from "@/utils/formatDate";
export class RoomService extends ServiceItemService {
  private static instance: RoomService;
  constructor() {
    super();
  }
  public static getInstance(): RoomService {
    if (!RoomService.instance) {
      RoomService.instance = new RoomService();
    }

    return this.instance;
  }

  async getBookingServiceItem(
    service_id: string,
    service_item_id: string
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      if (!service_id || !service_item_id) {
        return {
          message: "Không tồn tại dịch vụ này vui lòng cung cấp",
          status: 400,
          success: false,
        };
      }

      const [serviceItemDetail, service] = await Promise.all([
        prisma.serviceItem.findUnique({
          where: {
            service_id: service_id,
            id: service_item_id,
          },
          select: {
            id:true,
            name: true,
            imageServiceItems: {
              select: {
                image: {
                  select: {
                    url: true,
                  },
                },
              },
            },
            amenitiesRooms:{
              select:{
                amenityServiceItems:{
                  select:{
                    amenity:true,
                  }
                }
              }
            },
            max_people:true,
            area:true,
            price: true,
            serviceItemOccasions: {
              select: {
                DateOccassionEnd: true,
                DateOccassionStart: true,
              },
            },
          },
        }),

        prisma.service.findUnique({
          where: {
            id: service_id,
          },
          select: {
            id:true,
            service_name: true,
            location: {
              select: {
                location: true,
                ward: {
                  select: {
                    fullName: true,
                    province: {
                      select: {
                        fullName: true,
                      },
                    },
                  },
                },
              },
            },
            rating: true,
            total_reviews:true,
          },
        }),
      ]);

      return {
        data: {
          serviceItem: serviceItemDetail,
          service: service,
        },
        message: "Lấy danh sách dịch vụ thành công",
        status: 200,
        success: true,
      };
    } catch (error) {
      console.error("Lỗi getListItemService:", error);

      return {
        message: "Lỗi server, vui lòng thử lại sau",
        status: 500,
        success: false,
      };
    }
  }

  async getListItemService(
    params: SearchQueryServiceItem
  ): Promise<SuccessResponse<any[]> | ErrorResponse> {
    try {
      const page = Math.max(1, Number(params.page) || 1);
      const limit = Math.min(Math.max(1, Number(params.limit) || 10), 50);
      const skip = (page - 1) * limit;

      const children = Number(params.children) || 0;
      const adult = Number(params.adult) || 1;
      const numberOfPeople = adult;

      const room = Number(params.room) || 1;

      const startDate = params.startDate;
      const endDate = params.endDate;

      if (numberOfPeople <= 0) {
        return {
          message: "Số lượng người (người lớn + trẻ em) phải lớn hơn 0",
          status: 400,
          success: false,
        };
      }

      const maxPeople = Math.ceil(numberOfPeople / room);
      const where: Prisma.ServiceItemWhereInput = {
        service_id: params.service_id,
        max_people: {
          gte: maxPeople,
        },
        quantity: {
          gte: room,
        },
        OR: [
          { availiable_to: null, availiable_from: { lte: startDate } },
          {
            availiable_to: { gte: endDate },
            availiable_from: { lte: startDate },
          },
        ],
      };

      const roomList = await prisma.serviceItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { price: "asc" },

        select: {
          id: true,
          name: true,
          price: true,
          max_people: true,
          area: true,
          availiable_from: true,
          availiable_to: true,

          imageServiceItems: {
            select: {
              image: {
                select: { url: true },
              },
            },
            take: 5,
          },

          typeRoom: {
            select: {
              type: true,
            },
          },

          amenitiesRooms: {
            select: {
              amenityServiceItems: {
                select: {
                  amenity: true,
                },
              },
            },
          },

          serviceItemOccasions: {
            where: {
              DateOccassionStart: { lte: endDate },
              DateOccassionEnd: { gte: startDate },
            },
            select: {
              price_occassion: true,
              DateOccassionStart: true,
              DateOccassionEnd: true,
            },
          },
          serviceItemOffs: {
            where: {
              date_off_start: { lte: endDate },
              date_off_end: { gte: startDate },
            },
            select: {
              date_off_start: true,
              date_off_end: true,
            },
          },
        },
      });

      if (roomList.length === 0) {
        return {
          data: [],
          message: "Không tìm thấy dịch vụ phù hợp",
          status: 200,
          success: true,
        };
      }

      return {
        data: roomList,
        message: "Lấy danh sách dịch vụ thành công",
        status: 200,
        success: true,
      };
    } catch (error) {
      console.error("Lỗi getListItemService:", error);

      return {
        message: "Lỗi server, vui lòng thử lại sau",
        status: 500,
        success: false,
      };
    }
  }

  async updateItemService(
    service_item: RoomModel,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const updateRoom = await tx.serviceItem.update({
        where: {
          id: service_item.id,
        },
        data: {
          area: service_item.area,
          room_type_id: service_item.room_type_id,
          max_people: service_item.max_people,
          service_id: service_item.service_id,
          availiable_from: service_item.availiable_from,
          availiable_to: service_item.availiable_to,
          name: service_item.name,
          price: service_item.price,
          status_id: service_item.status_id,
          type_id: service_item.type_id,
          quantity: service_item.quantity,
        },
      });

      return {
        data: updateRoom,
        message: "Sửa thành công",
        status: 200,
        success: true,
      };
    } catch (error) {
      console.error("Lỗi trong quá trình thực hiện", error);

      return {
        success: false,
        message: "Lỗi trong quá trình thực hiện",
        status: 500,
      };
    }
  }

  async createItemService(
    service_item: RoomModel,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<ServiceItem> | ErrorResponse> {
    try {
      const createRoom = await tx.serviceItem.create({
        data: {
          area: service_item.area,
          room_type_id: service_item.room_type_id,
          max_people: service_item.max_people,
          service_id: service_item.service_id,
          availiable_from: service_item.availiable_from,
          availiable_to: service_item.availiable_to,
          name: service_item.name,
          price: service_item.price,
          status_id: service_item.status_id,
          type_id: service_item.type_id,
          quantity: service_item.quantity ?? 0,
        },
      });

      return {
        data: createRoom,
        status: 500,
        success: true,
        message: "Hoàn thành",
      };
    } catch (error) {
      console.error("Lỗi trong quá trình tạo dịch vụ", error);
      return {
        success: false,
        message: "Lỗi trong quá trình tạo dịch vụ",
        status: 500,
      };
    }
  }

  async deleteItemService(
    service_id: string,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<boolean> | ErrorResponse> {
    try {
      const deleteServiceItem = await super.deleteItemService(service_id, tx);
      return deleteServiceItem;
    } catch (error) {
      console.error("Erorr:", error);
      return {
        success: false,
        message: "Lỗi trong quá trình thực hiện",
        status: 500,
      };
    }
  }
}
