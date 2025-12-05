import AmenityServiceController from '@/controller/amenity_service.controller'
import { Router } from 'express'


const router = Router()

router.get('/',AmenityServiceController.getAmenityService) 

export default router