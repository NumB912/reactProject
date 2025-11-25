import { Router } from 'express'
import { serviceController } from '@/controller/service.controller'

const router = Router()

router.get('/', serviceController.getServiceList) 

export default router