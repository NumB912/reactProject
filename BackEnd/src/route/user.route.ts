import { Router } from 'express'
import UserController from '../controller/user.controller.js'
import multer from 'multer';
import { handleMulterError } from '@/middleware/handleMutalError.middleware.js';
import BookingController from '@/controller/booking.controller.js';
import { authMiddleware } from '@/middleware/auth.token.middleware.js';
const router = Router()
const upload = multer({ dest: 'uploads/' });
router.get('/',authMiddleware, UserController.getUsers) 
router.put('/profile',upload.fields([{
    name:'avatar',maxCount:1
}]),handleMulterError,authMiddleware, UserController.editProfile)

router.post('/become-supplier',upload.fields([{
    name:'tax_file',maxCount:4
},{
    name:'business_file',maxCount:4
}]),handleMulterError,authMiddleware,UserController.becomeSupplier)

router.post('/favorite',authMiddleware,UserController.handleFavorite)
router.post('/booking',authMiddleware,BookingController.bookingService)
router.get('/detail',authMiddleware,UserController.getUserOne)

export default router