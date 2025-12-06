
import { paymentController } from '@/controller/payment.controller'
import { Router } from 'express'


const router = Router()

router.get('/',paymentController.getPayment) 

export default router