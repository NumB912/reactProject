import { ManagementUserService } from "@/service/admin/management_user.service";
import { userService } from "@/service/user.Service";
import type { Request, Response } from "express";

class ManagementUserController {
  static async updateUser(req: Request, res: Response) {
    try {
      const { status_user, id, name, phone, bio } = req.body;
      if (!status_user || !id) {
        return res.status(400).json({
          message: "Loi khong co thong tin",
          status: 400,
        });
      }

      if (typeof status_user !== "string" || typeof id !== "string") {
        return res.status(400).json({
          message: "Loi khong co thong tin",
          status: 400,
        });
      }

      const updateStatus = await ManagementUserService.updateStatus({
        id: id,
        bio: bio,
        name: name,
        phone: phone,
        status: status_user,
      });

      return res.status(updateStatus.status).json({
        updateStatus,
      });
    } catch (error: any) {

      return res.status(500).json({
        status:500,
        message:"Lỗi trong quá trình thực thi"
      })

    }
  }

  static async getUserDetail(req: Request, res: Response) {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(401).json({
          success: false,
          message: "Không tìm thấy thông tin người dùng",
        });
      }

      const user = await ManagementUserService.userDetail(id);
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
}

export default ManagementUserController;
