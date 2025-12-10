import prisma from "@/db";
import type { Role } from "@/enum/role.enum";
import type { NextFunction, Request, Response } from "express";

export const RoleMiddleware = (...allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.sub;
    
      if (!userId) {
        return res.status(401).json({
          message: "Không tìm thấy thông tin người dùng (Unauthorized)",
        });
      }

      const user = await prisma.person.findUnique({
        where: { id: userId },
        select: { role_id: true }, 
      });

      if (!user) {
        return res.status(404).json({
          message: "Người dùng không tồn tại",
        });
      }


      if (!allowedRoles.includes(user.role_id)) {
        return res.status(403).json({
          message: "Bạn không có quyền truy cập chức năng này",
        });
      }

      // Thành công → cho đi tiếp
      next();
    } catch (error) {
      console.error("RoleMiddleware Error:", error);
      return res.status(500).json({
        message: "Lỗi server khi kiểm tra quyền",
      });
    }
  };
};