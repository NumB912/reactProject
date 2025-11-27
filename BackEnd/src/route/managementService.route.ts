import { Router } from 'express'
import { managementServiceController } from '@/controller/supplier/management_service.controller'
import multer from 'multer';

const router = Router()
const upload = multer({ dest: 'uploads/' });

router.post('/add',managementServiceController.addService)
// router.post('/update',managementServiceController)
router.post('/change-image',upload.fields([{
    name:'imageFiles'
}]),managementServiceController.updateImage)

router.post('/amenity-change',managementServiceController.ChangeAmenity)

export default router