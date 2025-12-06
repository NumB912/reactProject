import AmenityServiceController from '@/controller/amenity_service.controller'
import HotelTypeController from '@/controller/hotel_type.controller'
import { Router } from 'express'


const router = Router()

router.get('/',HotelTypeController.getAmenityService) 

export default router