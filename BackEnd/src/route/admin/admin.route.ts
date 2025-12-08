import HandleBecomeSupplierController from '@/controller/admin/handleBecomeSupplier.controller'
import SupplierManagementController from '@/controller/admin/supplierManagement.controller'
import ManagementUserController from '@/controller/admin/userManagement.controller'
import UserController from '@/controller/user.controller'
import { Role } from '@/enum/role.enum'
import { authMiddleware } from '@/middleware/auth.token.middleware'
import { RoleMiddleware } from '@/middleware/role.middleware'
import { Router } from 'express'

const router = Router()
router.get('/RequestBecomeSupplier',authMiddleware,RoleMiddleware(Role.ROLE_ADMIN),HandleBecomeSupplierController.getRequestHandleBecomeSupplier)
router.post('/handle-become-supplier',authMiddleware,RoleMiddleware(Role.ROLE_ADMIN),HandleBecomeSupplierController.handleBecomeSupplier)
router.get('/DetailRequestBecomeSupplier',authMiddleware,RoleMiddleware(Role.ROLE_ADMIN),HandleBecomeSupplierController.getRequestBecomeSupplierDetail)
router.get('/user',authMiddleware,RoleMiddleware(Role.ROLE_ADMIN), UserController.getUsers)
router.get('/detail-user',authMiddleware,RoleMiddleware(Role.ROLE_ADMIN),ManagementUserController.getUserDetail)
router.put('/update-user',authMiddleware,RoleMiddleware(Role.ROLE_ADMIN),ManagementUserController.updateUser)
router.get('/suppliers',authMiddleware,RoleMiddleware(Role.ROLE_ADMIN),SupplierManagementController.getSupplier)
router.get('/supplier',SupplierManagementController.getSupplierDetail)
export default router