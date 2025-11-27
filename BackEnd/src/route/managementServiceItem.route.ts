import { Router } from 'express'
import { managementServiceController } from '@/controller/management_service.controller'
import { ManagementServiceItemController } from '@/controller/management_service_item.controller'

const router = Router()
router.post('/add',ManagementServiceItemController.addServiceItem)
export default router