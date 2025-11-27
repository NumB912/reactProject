import prisma from "@/db";
import { Role } from "@/enum/role.enum";
import { StatusType } from "@/enum/service/status.service.enum";
import { StatusBecomeSupplier } from "@/enum/status.become.supplier.enum";
import { BadRequestError, NotFoundError } from "@/model/error/error";
import type { Prisma } from "@prisma/client";

export class handleBecomeSupplierService {
  static async getRequestBecomeSupplier({
    page = 1,
    limit = 10,
    status,
    search,
  }: {
    page?: number;
    limit?: number;
    status?: StatusBecomeSupplier;
    search?: string;
  } = {}) {
    const skip = (page - 1) * limit;

    const where: Prisma.Request_become_supplierWhereInput = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { Person: { name: { contains: search, mode: "insensitive" } } },
          { Person: { email: { contains: search, mode: "insensitive" } } },
          { Person: { phone: { contains: search, mode: "insensitive" } } },
        ],
      }),
    };

    const [requests, total] = await prisma.$transaction([
      prisma.request_become_supplier.findMany({
        where,
        skip,
        take: limit,
        orderBy: { create_at: "desc" },
        select: {
          id: true,
          name: true,
          status: true,
          create_at: true,

          Person: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              image: {
                select: { url: true },
              },
            },
          },

          service: {
            select: {
              id: true,
              service_name: true,
              info: true,
              imageServices: {
                include: { image: true },
                take: 1,
              },
            },
          },
        },
      }),

      prisma.request_become_supplier.count({ where }),
    ]);

    return {
      data: requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  static async getDetailRequestBecomeSupplier(id: string) {
    const requestBecomeSuppliers =
      await prisma.request_become_supplier.findUnique({
        where: { id: id },

        select: {
          name: true,
          Person: {
            select: {
              name: true,
              phone: true,
              email: true,
              image: {
                select: {
                  url: true,
                },
              },
            },
          },

          other_Document_supplier: {
            select: {
              file_url: true,
              file_type: true,
              upload_at: true,
            },
          },
          tax_code: true,
          status: true,
          service: {
            select: {
              service_name: true,
              description: true,
              info: true,
              location: true,
            },
          },
        },
      });

    return requestBecomeSuppliers;
  }
  
  static async handleBecomeSupplier(
    status: StatusBecomeSupplier,
    request_become_supplier_id: string
  ) {
    if (!request_become_supplier_id) {
      throw new BadRequestError("request_become_supplier_id là bắt buộc");
    }

    if (!Object.values(StatusBecomeSupplier).includes(status)) {
      throw new BadRequestError(
        `Trạng thái không hợp lệ. Chỉ chấp nhận: ${Object.values(
          StatusBecomeSupplier
        ).join(", ")}`
      );
    }

    try {
      const result = await prisma.$transaction(async (tx) => {
        const request = await tx.request_become_supplier.findUnique({
          where: { id: request_become_supplier_id },
          select: {
            id: true,
            status: true,
            Person: true,
          },
        });

        if (!request) {
          throw new NotFoundError(
            `Không tìm thấy yêu cầu với ID: ${request_become_supplier_id}`
          );
        }

        if (
          request.status === StatusBecomeSupplier.APPROVED ||
          request.status === StatusBecomeSupplier.CANCEL
        ) {
          throw new BadRequestError(
            `Yêu cầu này đã được xử lý trước đó với trạng thái: ${request.status}`
          );
        }

        const updatedRequest = await tx.request_become_supplier.update({
          where: { id: request_become_supplier_id },
          data: {
            status,
            proccess_at: new Date(),
          },
          select: {
            id: true,
            Person: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                image: {
                  select: {
                    url: true,
                  },
                },
              },
            },

            service: {
              select: {
                id: true,
              },
            },
          },
        });

        if (
          status === StatusBecomeSupplier.APPROVED &&
          updatedRequest.id &&
          updatedRequest.Person?.id &&
          updatedRequest.service?.id
        ) {
          await tx.person.update({
            where: { id: updatedRequest.Person.id },
            data: {
              role_id: Role.ROLE_SUPPLIER,
            },
          });

          await tx.service.update({
            where: { id: updatedRequest.service.id },
            data: {
              status_id: StatusType.ACTIVE,
            },
          });
        }
      });

      return {
        success: true,
        message: `Yêu cầu đã được ${
          status === StatusBecomeSupplier.APPROVED ? "duyệt" : "từ chối"
        } thành công`,
        data: result,
      };
    } catch (error) {
      console.error("[handleBecomeSupplier] Error:", error);
      return {
        success: false,
        message: `Lỗi trong quá trình thực hiện: ${error}`,
      };
    }
  }
}
