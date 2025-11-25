import { Router } from 'express'
import AuthenticationController from '@/controller/authentication.controller'
import { signUpValidationRules } from '@/middleware/validator_signup'
import { loginValidationRules } from '@/middleware/validator_login'

const router = Router()

router.post('/register',signUpValidationRules,AuthenticationController.register) 
router.post('/submit-otp',AuthenticationController.otpVerify)
router.post('/check-email',AuthenticationController.checkEmail)
router.post('/login',loginValidationRules,AuthenticationController.login)
router.post('/reset-password',AuthenticationController.resetPassword)
router.post('/mail-reset-password',AuthenticationController.mailResetPassword)
router.post('/google-login',AuthenticationController.googleLogin)
router.post('/logout',AuthenticationController.logout)

export default router