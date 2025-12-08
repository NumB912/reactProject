import prisma from "@/db";

import type { Request, Response } from "express";

class RoleController {
  static async getRole(req: Request, res: Response) {
    try {
      const role = await prisma.role.findMany();

      return res.status(200).json({
        data: role,
        message: "Thành công",
        status: 200,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi trong quá trình lấy dữ liệu",
        status: 500,
      });
    }
  }
}

export default RoleController