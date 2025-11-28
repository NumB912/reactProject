import { Router } from 'express'
import { managementServiceController } from '@/controller/supplier/management_service.controller'
import { ManagementServiceItemController } from '@/controller/supplier/management_service_item.controller'
import multer from 'multer';

const router = Router()
const upload = multer({ dest: 'uploads/' });

router.post('/',upload.fields([{
    name:'imageFiles'
}]),ManagementServiceItemController.addServiceItem)
router.put('/',upload.fields([{
    name:'imageFiles'
}]),ManagementServiceItemController.updateServiceItem)
export default router