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
          booking: {
            select: {
              email: true,
              name: true,
              total_amount: true,
              phone: true,
              check_in: true,
              check_out: true,
              service_id:true,
              service_item_id:true,
            },
          },
          expired_date: true,
        },
      });

      if(!payment){
        return {
          status:400,
          message:"",
          success:false,
        }
      }

      if(!payment.booking?.service_id){
          return {
          status:400,
          message:"",
          success:false,
        }
      }

      const service = await prisma.service.findUnique({
        where:{
            id:payment.booking.service_id
        },
        select:{
            service_name:true,
            rating:true,
            total_reviews:true,
        }
      })

      

      const serviceItem = await prisma.serviceItem.findUnique({
        where:{
            id:payment?.booking?.service_item_id
        },select:{
            amenitiesServiceItems:{
                select:{
                    amenityServiceItem:true,
                }
            }
        }
      })

      return {
        data: {
            payment:payment,
            serviceItem:serviceItem,
            service:service
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
