import type { Request, Response } from "express";
import { userService } from "../service/user.Service";

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const {
        search,
        role,
        page = "1",
        limit = "1",
        sortBy = "name",
        sortOrder = "asc",
      } = req.query;

      const result = await userService.getAllUsers({
        search: search as string,
        role: role as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        sortBy: sortBy as string,
        sortOrder: sortOrder as "asc" | "desc",
      });

      return res.status(200).json({
        status: "success",
        message: "Lấy danh sách người dùng thành công",
        data: result.users,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
          hasNextPage: result.page < result.totalPages,
          hasPrevPage: result.page > 1,
        },
      });
    } catch (error) {
      console.error("Get users error:", error);

      return res.status(500).json({
        status: "error",
        message: "Lấy danh sách người dùng thất bại",
      });
    }
  }

  static async getUserOne(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Không tìm thấy thông tin người dùng trong token",
        });
      }

      const user = await userService.findOne(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Lấy thông tin người dùng thành công",
        data: {
          user: user,
        },
      });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "ID người dùng không hợp lệ",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ khi lấy thông tin người dùng",
      });
    }
  }


  static async editProfile(req: Request, res: Response) {
    try {
      const payload = req.user;
      if (!payload || !payload.sub) {
        return res.status(400).json({
          message: "không tồn tại người dùng",
        });
      }

      const { name, phone, bio } = req.body;
      const id = payload.sub;
      const files = req.files;
      const avatarFile = (req.files as any)?.avatar?.[0] as
        | Express.Multer.File
        | undefined;
      const wallpaperFile = (req.files as any)?.wallpaper?.[0] as
        | Express.Multer.File
        | undefined;



      const updatedProfile = await userService.editProfile({
        id: id,
        name: name,
        phone: phone,
        bio: bio,
        wallpaperFile: wallpaperFile,
        avatarFile: avatarFile,
      });

      return res.status(updatedProfile.status).json({
        ...updatedProfile,
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
      const payload = req.user;
      if (!payload || !payload.sub) {
        return res.status(400).json({
          message: "Không tồn tại người dùng",
        });
      }

      const id = payload.sub;
      const {
        property_name,
        type_service,
        location,
        ward_id,
        tax_code,
        lng,
        lat,
      } = req.body;

      const files = req.files as {
        tax_file?: Express.Multer.File[];
        business_file?: Express.Multer.File[];
      };

      if (!files.tax_file || files.tax_file.length === 0) {
        return res.status(400).json({
          message: "Vui lòng upload giấy chứng nhận thuế",
        });
      }

      if (!files.business_file || files.business_file.length === 0) {
        return res.status(400).json({
          message: "Vui lòng upload giấy phép kinh doanh",
        });
      }

      const result = await userService.becomeSupplier({
        user_id: id,
        type_service: type_service,
        lcg: location,
        property_name: property_name,
        ward_id: ward_id.toString(),
        tax_code: tax_code,
        lat: lat,
        lng: lng,
        tax_files: files.tax_file,
        business_files: files.business_file,
      });

      return res.status(result.status).json(result);
    } catch (error) {
      console.log("Lỗi ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  }

    static async getRequest(req: Request, res: Response) {
    try {
      const payload = req.user;
      if (!payload || !payload.sub) {
        return res.status(400).json({
          message: "Không tồn tại người dùng",
        });
      }

      const id = payload.sub;


      if(!id){
        return res.status(400).json({
          message: "Không tồn tại người dùng",
        });
      }

      const result = await userService.getRequestSupplier(
        id
      );

      return res.status(result.status).json(result);
    } catch (error) {
      console.log("Lỗi ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  }

  static async handleFavorite(req: Request, res: Response) {
    try {
      const { service_id, user_id } = req.body;
      const favorite = await userService.handleFavorite(user_id, service_id);

      return res.json(favorite);
    } catch (err) {
      console.error("Lỗi", err);
      return res.json({});
    }
  }
}

export default UserController;
