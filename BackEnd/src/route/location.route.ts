import { Router } from 'express'
import AuthenticationController from '@/controller/authentication.controller'
import { signUpValidationRules } from '@/middleware/validator_signup'
import { loginValidationRules } from '@/middleware/validator_login'
import LocationController from '@/controller/location.controller'

const router = Router()
router.get('/province',LocationController.getProvince)
router.get('/ward',LocationController.getWard)
router.get('/search',LocationController.searchLocation)
export default router