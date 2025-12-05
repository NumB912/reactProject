import type { Request, Response } from "express";
import { userService } from "../service/user.Service.js";
class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json({
        status: "success",
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.error("Get users error:", error);

      return res.status(500).json({
        status: "error",
        message: "Lấy danh sách người dùng thất bại",
      });
    }
  }

  static async editProfile(req: Request, res: Response) {
    try {
      const { name, phone, bio, id } = req.body;

      const avatarFile = (req.files as any)?.avatar?.[0] as
        | Express.Multer.File
        | undefined;
      const wallpaperFile = (req.files as any)?.wallpaper?.[0] as
        | Express.Multer.File
        | undefined;
      const updatedProfile = await userService.editProfile({
        id,
        name,
        phone,
        bio,
        wallpaperFile: wallpaperFile,
        avatarFile: avatarFile,
      });

      return res.json({
        data: updatedProfile,
      });
    } catch (error) {
      console.error("Edit profile error:", error);
      return res.status(500).json({
        status: "error",
        message: "Cập nhật hồ sơ thất bại",
      });
    }
  }

  static async becomeSupplier(req: Request, res: Response) {
    try {
      const {
        id,
        property_name,
        type_service,
        location,
        ward_id,
        account_number,
        account_holder,
        tax_code,
        lng,
        lat,
      } = req.body;

      const fieldFiles = req.files;
      const tax_file = (fieldFiles as any)?.tax_file as Express.Multer.File[];
      const bussiness_lisence_file = (fieldFiles as any)
        ?.business_file as Express.Multer.File[];
      const result = await userService.becomeSupplier({
        user_id: id,
        account_holder: account_holder,
        type_service: type_service,
        lcg: location,
        property_name: property_name,
        ward_id: ward_id.toString(),
        account_number: account_number,
        tax_code: tax_code,
        tax_files: tax_file,
        business_files: bussiness_lisence_file,
        lat: lat,
        lng: lng,
      });

      return res.json(result);
    } catch (error) {
      console.error("Lỗi ", error);
      return res.json({
        success: false,
        message: "Lỗi",
        status: 500,
      });
    }
  }

  static async handleFavorite(req: Request, res: Response) {
    try {
      const {service_id,user_id} = req.body
      const favorite =await userService.handleFavorite(user_id,service_id)

      return res.json(favorite)


    } catch (err) {
      console.error("Lỗi",err)
      return res.json({
  
      })

    }
  }
}

export default UserController;
