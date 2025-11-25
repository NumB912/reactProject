import { Router } from 'express'
import UserController from '../controller/user.controller.js'
import multer from 'multer';
import { handleMulterError } from '@/middleware/handleMutalError.middleware.js';
const router = Router()
const upload = multer({ dest: 'uploads/' });
router.get('/', UserController.getUsers) 
router.put('/profile',upload.fields([{
    name:'avatar',maxCount:1
},{
    name:'wallpaper',maxCount:1
}]),handleMulterError, UserController.editProfile)

router.post('/become-supplier',upload.fields([{
    name:'tax_file',maxCount:4
},{
    name:'business_file',maxCount:4
}]),handleMulterError,UserController.becomeSupplier)

router.post('/favorite',UserController.handleFavorite)

export default router