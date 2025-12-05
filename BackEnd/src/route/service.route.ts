import { Router } from 'express'
import { serviceController } from '@/controller/service.controller'
import { managementServiceController } from '@/controller/supplier/management_service.controller'
import { ManagementServiceItemController } from '@/controller/supplier/management_service_item.controller'
import { arrayQueryMiddleware } from '@/middleware/arrayQuery'

const router = Router()

router.get('/',serviceController.getServiceList) 
router.get('/detail',serviceController.getServiceDetail)
router.get('/service-item',serviceController.getServiceDetail)
export default router