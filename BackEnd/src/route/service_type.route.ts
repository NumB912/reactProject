import serviceTypeController from '@/controller/service_type.controller'
import { Router } from 'express'

const router = Router()

router.get('/',serviceTypeController.getServiceType) 


export default router