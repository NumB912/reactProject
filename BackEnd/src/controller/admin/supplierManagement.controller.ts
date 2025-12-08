import { ManagementUserService } from "@/service/admin/management_user.service";
import ManagementSupplierService from "@/service/admin/managment_supplier.service";
import { userService } from "@/service/user.Service";
import type { Request, Response } from "express";

class ManagementSupplierController {
  static async getSupplier(req: Request, res: Response) {
    try {
      const suppliers = await ManagementSupplierService.getSuppliers();

      return res.status(suppliers.status).json({
        ...suppliers,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Lỗi trong quá trình thực thi",
      });
    }
  }

  static async getSupplierDetail(req: Request, res: Response) {
    try {
      const { id } = req.query;

      if (!id || typeof id != "string") {
        return res.status(400).json({
          message: "Lỗi dữ liệu không tồn tại",
          status: 400,
        });
      }

      const suppliers = await ManagementSupplierService.getSuppliersDetail(id);

      return res.status(suppliers.status).json({
        ...suppliers,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Lỗi trong quá trình thực thi",
      });
    }
  }

  //   static async getUserDetail(req: Request, res: Response) {
  //     try {
  //       const { id } = req.query;
  //       if (!id || typeof id !== "string") {
  //         return res.status(401).json({
  //           success: false,
  //           message: "Không tìm thấy thông tin người dùng",
  //         });
  //       }

  //       const user = await ManagementUserService.userDetail(id);
  //       if (!user) {
  //         return res.status(404).json({
  //           success: false,
  //           message: "Không tìm thấy người dùng",
  //         });
  //       }

  //       return res.status(200).json({
  //         success: true,
  //         message: "Lấy thông tin người dùng thành công",
  //         data: {
  //           user: user,
  //         },
  //       });
  //     } catch (error: any) {
  //       if (error.name === "CastError") {
  //         return res.status(400).json({
  //           success: false,
  //           message: "ID người dùng không hợp lệ",
  //         });
  //       }

  //       return res.status(500).json({
  //         success: false,
  //         message: "Lỗi máy chủ khi lấy thông tin người dùng",
  //       });
  //     }
  //   }
}

export default ManagementSupplierController;
