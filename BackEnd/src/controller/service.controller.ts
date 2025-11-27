import prisma from "@/db";
import { ServiceType } from "@/enum/service/type.service.enum";
import { BaseService } from "@/service/service/base.service";
import { HotelService } from "@/service/service/hotel.service";
import { RentalCarService } from "@/service/service/rentalCar.service";
import { ThingToDoService } from "@/service/service/tour.service";
import type { Request, Response } from "express";

interface SearchQuery {
  page?: string;
  limit?: string;
  search?: string;      
  sortBy?: "service_name" | "rating" | "create_at" | "price_from";     
  sortOrder?: 'asc' | 'desc';
}

export class serviceController {
static async getServiceList(req: Request<{}, {}, {}, SearchQuery>, res: Response) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '10', 10))); 
    const search = (req.query.search || '').trim();
    const sortBy = req.query.sortBy;       
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';
    const result = await ThingToDoService.getInstance().getListServices({
      search:search,
      limit:limit,
      sortBy:sortBy,
      sortOrder:sortOrder,
      page:page
    });

    return res.json({
      result
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dịch vụ:', error);
    return res
      .status(500)
      .json({ message: 'Lỗi hệ thống, vui lòng thử lại sau.' });
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
        where:{
          id:service_id
        },
        select:{
          id:true,
          service_type_id:true,
        }
      })

      const type_id = service?.service_type_id || "";
      let data = {};
      switch (type_id) {
        case ServiceType.HOTEL:
          data = await HotelService.getInstance().getDetailService(service_id);
          break;
        case ServiceType.RENTAL_CAR:
          data = await RentalCarService.getInstance().getDetailService(service_id);
          break;
        case ServiceType.THING_TO_DO:
          data = await ThingToDoService.getInstance().getDetailService(service_id);
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

  static async searchService(req: Request, res: Response) {
    const { q } = req.query;
  }
}
