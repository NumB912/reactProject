import { paymentService } from "@/service/payment/payment.service";
import type { Request, Response } from "express";

export class paymentController {
  static async getPayment(req: Request, res: Response) {
    try {

        const {id} = req.query
        console.log(id)
        if(!id || typeof id != 'string'){
            return res.status(400).json({
                message:"Không tồn tại đơn thanh toán"
            })
        }
        
        console.log(id)

        const payment = await paymentService.getPayment(id)

        return res.status(payment.status).json(payment)

    } catch (error) {

        return res.status(500).json({
            message:"Lỗi trong quá trình thực hiện"
        })

    }
  }
}
