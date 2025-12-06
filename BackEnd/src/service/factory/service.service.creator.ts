import prisma from "@/db";
import { StatusBecomeSupplier } from "@/enum/status.become.supplier.enum";
import { ServiceType } from "@/enum/service/type.service.enum";
import type { BecomeSupplierDTO } from "@/model/user/becomeSuplier_DTO.model";
import type { IServiceCreator } from "@/model/IserviceCreator.model";
import { Decimal } from "@prisma/client/runtime/library";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { Prisma, Service } from "@prisma/client";
import { StatusType } from "@/enum/service/status.service.enum";
import { type HotelServiceModel, type RentalCarServiceModel, type ThingToDoServiceModel } from "@/model/service/service.model";
import { ThingToDoService } from "../service/tour.service";
import { RentalCarService } from "../service/rentalCar.service";
import { HotelService } from "../service/hotel.service";

export class HotelServiceCreator implements IServiceCreator {
  async create(
    hotel: HotelServiceModel,
    tx:Prisma.TransactionClient
  ): Promise<SuccessResponse<Service> | ErrorResponse> {
    try {
      const createHotel = await HotelService.getInstance().createService({
        service_name: hotel.service_name,
        supplier_id: hotel.supplier_id,
        create_at: new Date(),
        update_at: new Date(),
        location_id: hotel.location_id,
        service_type_id: ServiceType.HOTEL,
        status_id: StatusType.PEDDING,
        price_from:hotel.price_from,
        price_to:hotel.price_to,
        description:"",
        total_reviews:0,
        quantity_room:0,
        info:"",
        rating:Decimal(0),
        type_hotel_id:null,
      },tx);

      return createHotel;
    } catch (error) {
      return {
        message: "Lỗi trong quá trình tạo",
        status: 500,
        success: false,
      };
    }
  }
}

export class RentalCarServiceCreator implements IServiceCreator {
  async create(
    rentalCar: RentalCarServiceModel,
    tx:Prisma.TransactionClient
  ): Promise<SuccessResponse<Service> | ErrorResponse> {
    try {
      const createHotel = await RentalCarService.getInstance().createService({
        service_name: rentalCar.service_name,
        supplier_id: rentalCar.supplier_id,
        create_at: new Date(),
        update_at: new Date(),
        location_id: rentalCar.location_id,
        service_type_id: ServiceType.HOTEL,
        status_id: StatusType.PEDDING,
        price_from:rentalCar.price_from,
        price_to:rentalCar.price_to,
        description:"",
        total_reviews:0,
        info:"",
        rating:Decimal(0),
      },tx);

      return createHotel;
    } catch (error) {
      return {
        message: "Lỗi trong quá trình tạo",
        status: 500,
        success: false,
      };
    }
  }
}

export class ThingToDoServiceCreator implements IServiceCreator {
  async create(
    ThingToDo: ThingToDoServiceModel,
    tx:Prisma.TransactionClient
  ): Promise<SuccessResponse<Service> | ErrorResponse> {
    try {
      const create = await ThingToDoService.getInstance().createService({
        service_name: ThingToDo.service_name,
        supplier_id: ThingToDo.supplier_id,
        create_at: new Date(),
        update_at: new Date(),
        location_id: ThingToDo.location_id,
        service_type_id: ServiceType.HOTEL,
        status_id: StatusType.PEDDING,
        price_from:ThingToDo.price_from,
        price_to:ThingToDo.price_to,
        description:"",
        total_reviews:0,
        info:"",
        rating:Decimal(0),
      },tx);

      return create;
    } catch (error) {
      return {
        message: "Lỗi trong quá trình tạo",
        status: 500,
        success: false,
      };
    }
  }
}