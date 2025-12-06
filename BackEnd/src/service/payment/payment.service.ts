import prisma from "@/db";
import type { SuccessResponse, ErrorResponse } from "@/model/api.model";

export class paymentService {
  static async getPayment(
    id: string
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const payment = await prisma.payment.findUnique({
        where: {
          id: id,
        },
        select: {
          booking_id: true,
          expired_date: true,
        },
      });

      if (!payment) {
        return {
          status: 400,
          message: "",
          success: false,
        };
      }

      if (!payment.booking_id) {
        return {
          status: 400,
          message: "không tồn tại booking",
          success: false,
        };
      }

      const booking = await prisma.booking.findUnique({
        where: {
          id: payment.booking_id,
        },
        select: {
          email: true,
          name: true,
          total_amount: true,
          phone: true,
          check_in: true,
          check_out: true,
          service_id: true,
          service_item_id: true,
          quantity: true,
        },
      });

      if (!booking?.service_id) {
        return {
          status: 400,
          message: "không tồn tại booking",
          success: false,
        };
      }

      const service = await prisma.service.findUnique({
        where: {
          id: booking?.service_id,
        },
        select: {
          service_name: true,
          rating: true,
          total_reviews: true,
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
        },
      });

      if (!booking?.service_item_id) {
        return {
          status: 400,
          message: "không tồn tại dịch vụ",
          success: false,
        };
      }

      const serviceItem = await prisma.serviceItem.findUnique({
        where: {
          id: booking?.service_item_id,
        },
        select: {
          max_people: true,
          name:true,
          quantity: true,
          amenitiesServiceItems: {
            select: {
              amenityServiceItem: true,
            },
          },
          imageServiceItems:{
            select:{
              image:{
                select:{
                  url:true,
                }
              }
            }
          },
          area:true,
        },
      });

      return {
        data: {
          booking: booking,
          serviceItem: serviceItem,
          service: service,
        },
        message: "",
        status: 200,
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        message: "",
        status: 200,
        success: false,
      };
    }
  }
}
