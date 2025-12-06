import { BookingType } from "@/enum/booking/booking.enum";
import type { HotelBooking } from "@/model/booking/booking.model";
import type { IBookingService } from "./booking.service";
import prisma from "@/db";
import type { Prisma, Booking as PrismaBooking } from "@prisma/client";
import { ServiceItemStatus } from "@/enum/service_item/status.serviceItem.enum";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import { ppid } from "process";
import { check } from "express-validator";
import { StatusBooking } from "@/enum/booking/status.enum";

export class HotelBookingService implements IBookingService {
  private static instance: HotelBookingService;

  public static getInstance(): HotelBookingService {
    if (!HotelBookingService.instance) {
      return (HotelBookingService.instance = new HotelBookingService());
    }
    return HotelBookingService.instance;
  }

  async bookingService(
    data: HotelBooking
  ): Promise<SuccessResponse<PrismaBooking> | ErrorResponse> {
    try {
      if (!data) {
        return {
          status: 400,
          message: "Chưa có dữ liệu đầu vào",
          success: false,
        };
      }

      if (!data.user_id) {
        return {
          status: 400,
          message: "Chưa có dữ liệu người dùng",
          success: false,
        };
      }

      if (!data.service_item_id) {
        return {
          status: 400,
          message: "Chưa có dữ liệu dịch vụ sản phẩm",
          success: false,
        };
      }

      if (!data.service_id) {
        return {
          status: 400,
          message: "Chưa có dữ liệu dịch vụ",
          success: false,
        };
      }

      const checkBooking = await prisma.booking.aggregate({
        where: {
          NOT: [
            {
              OR: [
                { check_out: { lte: data.check_in } },
                { check_in: { gte: data.check_out } },
              ],
            },
          ],
          service_id:data.service_id,
          service_item_id:data.service_item_id
        },
        _sum: {
          quantity: true,
        },
      });
      const quantity_room_avaiable = checkBooking._sum.quantity||0

      const service_item = await prisma.serviceItem.findFirst({
        where: {
          id: data.service_item_id,
          status_id: ServiceItemStatus.ACTIVE,
          service_id: data.service_id,
        },
      });

      console.log(service_item)

      if (!service_item || !service_item.quantity) {
        return {
          message: "Lỗi không tồn tại dịch vụ",
          status: 400,
          success: false,
        };
      }

      console.log(quantity_room_avaiable)

      if(service_item.quantity - quantity_room_avaiable - data.quantity < 0){
          return {
          message: "Không còn phòng nữa bạn hãy chọn phòng khác",
          status: 403,
          success: false,
        };
      }

      const user = await prisma.person.findUnique({
        where: {
          id: data.user_id,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        return {
          message: "Lỗi không tồn tại người dùng",
          status: 400,
          success: false,
        };
      }
      const created_at = new Date();
      const expired_at = new Date(created_at.getTime() + 30 * 60 * 1000);

      const totalPrice = service_item.price || 1 * data.quantity;
      const transaction = await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.create({
          data: {
            service_item_id: service_item?.id,
            booking_type_id: BookingType.BOOKING_ROOM,
            adult: data.adult,
            children: data.children,
            check_in: data.check_in,
            check_out: data.check_out,
            name: service_item.name,
            email: data.email,
            total_amount: totalPrice,
            user_id: data.user_id,
            quantity: data.quantity,
            phone: data.phone,
            service_id: data.service_id,
            expired_at: expired_at,
            create_at: created_at,
            status:StatusBooking.WAITING_PAYMENT
          },
        });

        return booking;
      });
      

      return {
        success: true,
        data: transaction,
        message: "",
        status: 202,
      };
    } catch (error) {
      return {
        success: false,
        message: `Lỗi trong quá trình thực thi ${error}`,
        status: 500,
      };
    }
  }
}
