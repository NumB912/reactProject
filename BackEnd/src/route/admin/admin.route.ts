import HandleBecomeSupplierController from '@/controller/admin/handleBecomeSupplier.controller'
import { Router } from 'express'

const router = Router()
router.get('/RequestBecomeSupplier',HandleBecomeSupplierController.getRequestHandleBecomeSupplier)
router.post('/handle-become-supplier',HandleBecomeSupplierController.handleBecomeSupplier)
router.get('/DetailRequestBecomeSupplier',HandleBecomeSupplierController.getRequestBecomeSupplierDetail)
export default router