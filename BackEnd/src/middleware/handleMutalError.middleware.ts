// middleware/multerErrorHandler.ts
import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const handleMulterError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Bạn upload chỉ được đúng số lượng file quy định thôi',
      });
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Kích thước file vượt quá giới hạn cho phép',
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message || 'Lỗi upload file',
    });
  }

  next(err);
};