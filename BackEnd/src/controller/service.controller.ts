import prisma from "@/db";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { GetListServicesParams } from "@/model/service/baseService.model";
import { BaseService } from "@/service/service/base.service";
import { HotelService } from "@/service/service/hotel.service";
import { RentalCarService } from "@/service/service/rentalCar.service";
import { ThingToDoService } from "@/service/service/tour.service";
import type { Service } from "@prisma/client";
import type { Request, Response } from "express";

interface SearchQuery {
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

export class serviceController {
  static async getServiceList(
    req: Request<{}, {}, {}, SearchQuery>,
    res: Response
  ) {
    try {
      const page = req.query.page
      const limit = req.query.limit
      const search = (req.query.search || "").trim();
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";
      const service_type_id = req.query.type_id;

      let result = {};

      const paramsTemp = {
        search: search,
        limit: limit,
        page: page,
        sortBy: sortBy,
        sortOrder: sortOrder,
      } as GetListServicesParams;

      switch (service_type_id) {
        case ServiceType.HOTEL:
          const amenities_hotel = req.query.amenities_hotel as string[];
          const amenities_room = req.query.amenities_room as string[]
          const type_hotel = req.query.type_hotel as string[];
          const paramsHotel = {
            ...paramsTemp,
            amenities_hotel,
            amenities_room,
            type_hotel
          };

          console.log(paramsHotel)
          result = await HotelService.getInstance().getListServices(
            paramsHotel
          );
          break;
        case ServiceType.RENTAL_CAR:
          const amenities_car = req.query.amenities_car as string[];
          const tranmission = req.query.tranmission as string[]
          const type = req.query.type_hotel;

          const paramCar = {
            ...paramsTemp,
            amenities_car,
            tranmission,
            type
          };
          
          result = await HotelService.getInstance().getListServices(
            paramCar
          );
        
          break;
        case ServiceType.THING_TO_DO:
          const paramsThingToDo = {
            ...paramsTemp,
          };

          result = await ThingToDoService.getInstance().getListServices(
            paramsThingToDo
          );
          break;
      }

      return res.json({
        result,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return res
        .status(500)
        .json({ message: "Lỗi hệ thống, vui lòng thử lại sau." });
    }
  }

  static async getServiceDetail(req: Request, res: Response) {
    try {
      const { service_id } = req.query;

      if (!service_id || typeof service_id !== "string") {
        return res
          .status(400)
          .json({ message: "Lỗi: service_id không hợp lệ" });
      }

      const service = await prisma.service.findUnique({
        where: {
          id: service_id,
        },
        select: {
          id: true,
          service_type_id: true,
        },
      });

      const type_id = service?.service_type_id || "";
      let data = {};
      switch (type_id) {
        case ServiceType.HOTEL:
          data = await HotelService.getInstance().getDetailService(service_id);
          break;
        case ServiceType.RENTAL_CAR:
          data = await RentalCarService.getInstance().getDetailService(
            service_id
          );
          break;
        case ServiceType.THING_TO_DO:
          data = await ThingToDoService.getInstance().getDetailService(
            service_id
          );
          break;
      }

      if (!data) {
        return res.status(404).json({ message: "Dịch vụ không tồn tại" });
      }

      return res.json(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return res
        .status(500)
        .json({ message: "Lỗi hệ thống, vui lòng thử lại sau." });
    }
  }
}
