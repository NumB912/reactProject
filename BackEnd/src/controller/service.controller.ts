import prisma from "@/db";
import { ServiceType } from "@/enum/service/type.service.enum";
import { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import type {
  ParamHotel,
  ParamRentalCar,
  ParamThingToDo,
  SearchQuery,
} from "@/model/service/baseService.model";
import { BaseService } from "@/service/service/base.service";
import { HotelService } from "@/service/service/hotel.service";
import { RentalCarService } from "@/service/service/rentalCar.service";
import { ThingToDoService } from "@/service/service/tour.service";
import { CarService } from "@/service/service_item/car.service";
import { RoomService } from "@/service/service_item/room.service";
import { TourService } from "@/service/service_item/tour.service";
import { parseDDMMYYYY } from "@/utils/formatDate";
import type { Service } from "@prisma/client";
import type { Request, Response } from "express";

export interface SearchQueryServiceItem {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: "service_name" | "rating" | "createdAt" | "price_from";
  sortOrder?: "asc" | "desc";
  service_id: string;
  type_id?: ServiceType;
  adult?: number;
  children?: number;
  room?: number;

  startDate?: Date;
  endDate?: Date;
}

export interface SearchQueryServiceDetail {
  page?: string;
  limit?: string;
  search?: string;
  service_id?: string;
  type_id?: ServiceType;
  startDate?: Date;
  endDate?: Date;
  adult?: number;
  children?: number;
  room?: number;
}

export class serviceController {
  static async getServiceList(
    req: Request<
      {},
      {},
      {},
      SearchQuery & ParamHotel & ParamRentalCar & ParamThingToDo
    >,
    res: Response
  ) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const search = (req.query.search || "").trim();
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";
      const service_type_id = req.query.type_id;
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const adult = req.query.adult;
      const children = req.query.children;
      const rating = req.query.rating;
      let result = {};

      const paramsTemp = {
        search: search,
        limit: limit,
        page: page,
        sortBy: sortBy,
        sortOrder: sortOrder,
        rating: rating,
        children: children,
        adult: adult,
        startDate: startDate,
        endDate: endDate,
      } as SearchQuery;

      switch (service_type_id) {
        case ServiceType.HOTEL:
          const amenitiesHotel = req.query.amenities_hotel;
          const amenities_room = req.query.amenities_room;
          const type_hotel = req.query.type_hotel;
          const room = req.query.room;
          const paramsHotel: ParamHotel = {
            ...paramsTemp,
            amenities_hotel: amenitiesHotel,
            amenities_room: amenities_room,
            type_hotel: type_hotel,
            room: room,
          };
          result = await HotelService.getInstance().getListServices(
            paramsHotel
          );
          break;

        case ServiceType.RENTAL_CAR:
          const amenities_car = req.query.amenities_car as string[];
          const tranmission = req.query.tranmission as string[];
          const type = req.query.type_car;
          const number_passenger = req.query.number_passenger;
          const paramCar = {
            ...paramsTemp,
            amenities_car: amenities_car,
            tranmission: tranmission,
            type: type,
            number_passenger: number_passenger,
          };

          result = await RentalCarService.getInstance().getListServices(
            paramCar
          );

          break;
        case ServiceType.THING_TO_DO:
          const duration = req.query.duration;
          const paramsThingToDo = {
            ...paramsTemp,
            duration: duration,
          };

          result = await ThingToDoService.getInstance().getListServices(
            paramsThingToDo
          );
          break;
      }

      return res.json({
        ...result,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return res
        .status(500)
        .json({ message: "Lỗi hệ thống, vui lòng thử lại sau." });
    }
  }

  static async getServiceItemList(
    req: Request<{}, {}, {}, SearchQueryServiceItem>,
    res: Response
  ) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const search = (req.query.search || "").trim();
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const adult = req.query.adult;
      const children = req.query.children;
      const service_id = req.query.service_id;
      const room = req.query.room;
      let result = {};

      const paramsTemp = {
        service_id: service_id,
        search: search,
        limit: limit,
        page: page,
        sortBy: sortBy,
        sortOrder: sortOrder,
        children: children,
        adult: adult,
        room: room,
        startDate: startDate,
        endDate: endDate,
      } as SearchQueryServiceItem;

      console.log(startDate);
      console.log(endDate);

      const service = await prisma.service.findUnique({
        where: {
          id: service_id,
        },
        select: {
          service_type_id: true,
        },
      });

      switch (service?.service_type_id) {
        case ServiceType.HOTEL:
          const param = {
            ...paramsTemp,
          };

          result = await RoomService.getInstance().getListItemService(param);
          break;
        case ServiceType.RENTAL_CAR:
          const paramCar = {
            ...paramsTemp,
          };

          result = await CarService.getInstance().getListItemService(paramCar);

          break;
        case ServiceType.THING_TO_DO:
          const paramsThingToDo = {
            ...paramsTemp,
          };

          result = await ThingToDoService.getInstance().getListServices(
            paramsThingToDo
          );
          break;
        default:
          break;
      }

      return res.json({
        ...result,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return res
        .status(500)
        .json({ message: "Lỗi hệ thống, vui lòng thử lại sau." });
    }
  }

  static async getServiceDetail(
    req: Request<{}, {}, {}, SearchQueryServiceDetail>,
    res: Response
  ) {
    try {
      const { search, service_id, startDate, endDate } = req.query;

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

  static async getBookingServiceItem(req: Request, res: Response) {
    try {
      const { service_id, serviceItemId } = req.query;

      if (
        !service_id ||
        typeof service_id !== "string" ||
        !serviceItemId ||
        typeof serviceItemId !== "string"
      ) {
        return res.status(400).json({ message: "Lỗi: Dịch vụ không hợp lệ" });
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
          data = await RoomService.getInstance().getBookingServiceItem(
            service_id,
            serviceItemId
          );
          break;
        case ServiceType.RENTAL_CAR:
          data = await CarService.getInstance().getBookingServiceItem(
            service_id,
            serviceItemId
          );
          break;
        case ServiceType.THING_TO_DO:
          data = await TourService.getInstance().getBookingServiceItem(
            service_id,
            serviceItemId
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
