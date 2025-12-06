// src/services/HotelService.ts
import prisma from "@/db";
import { ServiceType } from "@/enum/service/type.service.enum";
import { Prisma, type Service } from "@prisma/client";
import type {
  HotelServiceModel,
  ServiceModel,
} from "@/model/service/service.model";
import { Decimal } from "@prisma/client/runtime/library";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { ParamHotel } from "@/model/service/baseService.model";
import { BaseService } from "./base.service";
import type { SearchQueryServiceDetail } from "@/controller/service.controller";
import { RoomService } from "../service_item/room.service";
import { ServiceItemService } from "../service_item/service_item.service";

export class HotelService extends BaseService {
  private static instance: HotelService;

  constructor() {
    super();
  }

  async getListServices(params: ParamHotel): Promise<any> {
    try {
      const page = Number(params.page) || 1;
      const limit = Math.min(Number(params.limit) || 10, 50);
      const search = params.search?.trim() || "";
      const sortBy = params.sortBy || "createdAt";
      const sortOrder = params.sortOrder === "asc" ? "asc" : "desc";
      const skip = (page - 1) * limit;
      const amenities_hotel = params.amenities_hotel;
      const room_amenities = params.amenities_room;
      const type_hotel = params.type_hotel;
      const rating = params.rating;
      const startDate = params.startDate;
      const endDate = params.endDate;
      const amenities_room = params.amenities_room;
      const quantity_room = Number(params.room) ?? 1;
      const adult = Number(params.adult) ?? 1;
      const children = Number(params.children) ?? 0;

      const numberOfPeople = adult;
      const where: Prisma.ServiceWhereInput = {
        service_type_id: ServiceType.HOTEL,
      };

      if (search) {
        where.OR = [
          {
            location: {
              ward: {
                OR: [
                  {
                    province: {
                      OR: [
                        { fullName: { contains: search, mode: "insensitive" } },
                        {
                          fullNameEn: { contains: search, mode: "insensitive" },
                        },
                      ],
                    },
                  },
                  { fullName: { contains: search, mode: "insensitive" } },
                  {
                    fullNameEn: { contains: search, mode: "insensitive" },
                  },
                ],
              },
            },
          },
          {
            service_name: { contains: search, mode: "insensitive" },
          },
        ];
      }

      if (amenities_hotel && amenities_hotel.length > 0) {
        where.amenities_hotels = {
          some: {
            amenity_id: {
              in: amenities_hotel.split(",").map((item) => Number(item)),
            },
          },
        };
      }

      if (rating) {
        where.rating = {
          gte: Number(rating),
        };
      }

      if (room_amenities && room_amenities.length > 0) {
        where.serviceItems = {
          some: {
            amenitiesServiceItems: {
              some: {
                amenity_id: {
                  in: room_amenities.split(",").map((item) => Number(item)),
                },
              },
            },
          },
        };
      }

      if (type_hotel && type_hotel.length > 0) {
        where.type_hotel_id = {
          in: type_hotel.split(","),
        };
      }

      if (startDate && endDate) {
        where.serviceItems = {
          some: {
            availiable_from: {
              lte: endDate,
            },
            OR: [
              {
                availiable_to: null,
              },
              {
                availiable_to: {
                  gte: startDate,
                },
              },
            ],
          },
        };
      }

      const minMaxPeople = Math.ceil(numberOfPeople / quantity_room);
      if (numberOfPeople && quantity_room) {
        where.serviceItems = {
          some: {
            quantity: {
              gte: quantity_room,
            },
            max_people: {
              gte: minMaxPeople,
            },
          },
        };
      }

      const [data, total] = await Promise.all([
        prisma.service.findMany({
          where,
          select: {
            id: true,
            service_name: true,
            price_from: true,
            price_to: true,
            rating: true,
            total_reviews: true,
            info: true,
            imageServices: {
              select: {
                image: {
                  select: {
                    url: true,
                  },
                },
              },
            },
            location: {
              select: {
                location: true,
                ward: {
                  select: {
                    fullName: true,
                    name: true,
                    province: {
                      select: {
                        fullName: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            amenities_hotels: {
              select: {
                amenity: {
                  select: {
                    amenity: true,
                  },
                },
              },
            },
            typeHotel: true,
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
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
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

  public static getInstance(): HotelService {
    if (!HotelService.instance) {
      HotelService.instance = new HotelService();
    }
    return this.instance;
  }

  async getDetailService(
    params: SearchQueryServiceDetail
  ): Promise<SuccessResponse<any> | ErrorResponse> {
   try{
 const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.min(Math.max(1, Number(params.limit) || 10), 50);
    const skip = (page - 1) * limit;

    const children = Number(params.children) || 0;
    const adult = Number(params.adult) || 1;
    const numberOfPeople = adult;

    const room = Number(params.room) || 1;

    const startDate = params.startDate;
    const endDate = params.endDate;
    const service_id = params.service_id;

    if(!service_id){
      return {
        message:"Không tồn tại dịch vụ",
        status:400,
        success:false,
      }
    }


    const hotel = await prisma.service.findUnique({
      where:{
        id: service_id,
      },
      select: {
        id: true,
        amenities_hotels: {
          select: {
            amenity: true,
          },
        },
        description: true,
        info: true,
        imageServices: {
          select: {
            image: {
              select: {
                url: true,
              },
            },
          },
        },
        supplier: {
          select: {
            phone: true,
            email: true,
          },
        },
        price_from: true,
        price_to: true,
        rating: true,
        location: {
          select: {
            location: true,
            ward: {
              select: {
                fullName: true,
                province: true,
              },
            },
          },
        },
        total_reviews: true,
        reviews: {
          select: {
            content: true,
            person: {
              select: {
                name: true,
              },
            },
            create_at: true,
            update_at: true,
            rating: true,
            parent: {
              select: {
                parent_id: true,
              },
            },
          },
        },

        service_name: true,
      },
    });

    const serviceItems = await RoomService.getInstance().getListItemService({
      service_id:service_id,
      adult:adult,
      children:children,
      endDate:endDate,
      startDate:startDate,
    })

    console.log(serviceItems)

    if (!hotel) {
      return {
        success: false,
        message: "Không tìm thấy khách sạn",
        status: 404,
      };
    }

    return {
      data: {
        hotel:hotel,
        serviceItems:serviceItems.data
      },
      message: "Hoàn thành",
      status: 200,
      success: true,
    };
   }catch(error){
    return {
      message:"Lỗi trong quá trình lấy dữ liệu",
      status:500,
      success:false,
    }
   }
  }

  async createService(
    service: HotelServiceModel,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<Service> | ErrorResponse> {
    try {
      const createHotel = await tx.service.create({
        data: {
          service_name: service.service_name,
          info: service.info,
          status_id: service.status_id,
          rating: 0.0,
          service_type_id: ServiceType.HOTEL,
          quantity_room: service.quantity_room,
          description: service.description,
          type_hotel_id: service.type_hotel_id,
          location_id: service.location_id,
          supplier_id: service.supplier_id || "",
          price_from: service.price_from || Decimal(0),
          price_to: service.price_to || Decimal(0),
          total_reviews: 0,
        },
      });

      return {
        success: true,
        message: "thành công",
        status: 200,
        data: createHotel,
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
    service: HotelServiceModel,
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<Service> | ErrorResponse> {
    try {
      const updateService = await tx.service.update({
        where: {
          id: service.id,
        },
        data: {
          supplier_id: service.supplier_id,
          location_id: service.location_id,
          type_hotel_id: service.type_hotel_id,
          service_name: service.service_name,
          quantity_room: service.quantity_room,
          price_from: service.price_from ?? 0,
          price_to: service.price_to ?? 0,
          info: service.info,
          rating: service.rating,
          status_id: service.status_id,
        },
      });

      return {
        success: true,
        message: "Done",
        status: 200,
        data: updateService,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: `"Thất bại" ${error}`,
      };
    }
  }

  async deleteService(
    service_id: string,
    tx: Prisma.TransactionClient
  ): Promise<{ success: boolean; message: string; status: number }> {
    try {
      const deleteHotel = await super.deleteService(service_id, tx);

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
