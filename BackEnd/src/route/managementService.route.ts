import { Router } from 'express'
import { managementServiceController } from '@/controller/supplier/management_service.controller'
import multer from 'multer';

const router = Router()
const upload = multer({ dest: 'uploads/' });

router.post('/',managementServiceController.addService)
// router.post('/update',managementServiceController)
// router.post('/change-image',upload.fields([{
//     name:'imageFiles'
// }]),managementServiceController.updateImage)

router.put('/',upload.fields([{
    name:'imageFiles'
}]),managementServiceController.updateService)

// router.post('/amenity-change',managementServiceController.ChangeAmenity)

export default router