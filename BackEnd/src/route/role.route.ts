import AmenityServiceController from '@/controller/amenity_service.controller'
import RoleController from '@/controller/role.controller'
import { Role } from '@/enum/role.enum'
import { authMiddleware } from '@/middleware/auth.token.middleware'
import { RoleMiddleware } from '@/middleware/role.middleware'
import { Router } from 'express'


const router = Router()

router.get('/',authMiddleware,RoleMiddleware(Role.ROLE_ADMIN),RoleController.getRole) 

export default router