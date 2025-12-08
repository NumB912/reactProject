import prisma from "@/db";
import { StatusBecomeSupplier } from "@/enum/status.become.supplier.enum";
import {  handleBecomeSupplierService } from "@/service/admin/handleBecomeSupplier.request";
import { error } from "console";
import type { Request, Response } from "express";
;
class HandleBecomeSupplierController {
static async getRequestHandleBecomeSupplier(req: Request, res: Response) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));

      const status = req.query.status as StatusBecomeSupplier | undefined;
      const search = req.query.search?.toString().trim(); 
      const { data, pagination } = await handleBecomeSupplierService.getRequestBecomeSupplier({
        page,
        limit,
        status,
        search,
      });
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách yêu cầu trở thành nhà cung cấp thành công',
        data: data,
        pagination:pagination
      });
    } catch (error: any) {
      console.error('[getRequestHandleBecomeSupplier] Error:', error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống khi lấy danh sách yêu cầu',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }


static async getRequestBecomeSupplierDetail(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query;
      if (!id || typeof id !== 'string' || id.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'ID yêu cầu không hợp lệ hoặc không được cung cấp',
        });
      }

      const becomeSupplierRequest = await handleBecomeSupplierService.getDetailRequestBecomeSupplier(id);

      if (!becomeSupplierRequest) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy yêu cầu trở thành nhà cung cấp với ID này',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Lấy chi tiết yêu cầu thành công',
        data: becomeSupplierRequest,
      });

    } catch (error: any) {
      console.error('Error in getRequestBecomeSupplierDetail:', error);
      if (error.message === 'Không tồn tại dịch vụ' || error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          message: 'Yêu cầu không tồn tại',
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Đã có lỗi xảy ra khi lấy thông tin yêu cầu',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

static async handleBecomeSupplier(req: Request, res: Response): Promise<Response> {
    try {
      const { status_id, id } = req.body;
      if (!status_id || !id) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu trường status hoặc id',
        });
      }

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'ID yêu cầu không hợp lệ',
        });
      }


      if (!Object.values(StatusBecomeSupplier).includes(status_id)) {
        return res.status(400).json({
          success: false,
          message: `Trạng thái không hợp lệ. Chỉ chấp nhận: ${Object.values(StatusBecomeSupplier).join(', ')}`,
        });
      }
      const isExistRequest = await prisma.request_become_supplier.findUnique({
        where:{
          id:id
        }
      })

      if(!isExistRequest){
        return res.status(400).json({
          success:false,
          message:'Không tồn tại yêu cầu vui lòng thử lại'
        })
      }

      const result = await handleBecomeSupplierService.handleBecomeSupplier(
        status_id,
        id
      );
      return res.status(result.success ? 200 : 400).json({
        success: result.success,
        message: result.message,
        data: result.data || null,
      });

    } catch (error: any) {
      console.error('Lỗi trong handleBecomeSupplier controller:', error);
      if (error.message?.includes('không tồn tại') || error.message?.includes('not found')) {
        return res.status(404).json({
          success: false,
          message: 'Yêu cầu trở thành nhà cung cấp không tồn tại',
        });
      }
      return res.status(500).json({
        success: false,
        message: error.message || 'Đã xảy ra lỗi khi xử lý yêu cầu trở thành nhà cung cấp',
        ...(process.env.NODE_ENV === 'development' && { error: error.stack }),
      });
    }
  }
}

export default HandleBecomeSupplierController;
