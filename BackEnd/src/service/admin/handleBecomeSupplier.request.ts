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

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 2);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    const where: Prisma.Request_become_supplierWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  { company_name: { contains: search, mode: "insensitive" } },
                  {
                    person: { name: { contains: search, mode: "insensitive" } },
                  },
                  {
                    person: {
                      email: { contains: search, mode: "insensitive" },
                    },
                  },
                  {
                    person: {
                      phone: { contains: search, mode: "insensitive" },
                    },
                  },
                ],
              } satisfies Prisma.Request_become_supplierWhereInput,
            ]
          : []),

        {
          create_at: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
        },

        ...(status
          ? [{ status: status }]
          : [{ status: { in: ["PENDING", "APPROVED", "CANCEL"] } }]),
      ],
    };

    const stat =await prisma.request_become_supplier.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      where: {
        create_at: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });



    const [requests, total] = await prisma.$transaction([
      prisma.request_become_supplier.findMany({
        where,
        skip,
        take: limit,
        orderBy: { create_at: "desc" },

        select: {
          id: true,
          company_name: true,
          name: true,
          status: true,
          create_at: true,
          person: {
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
        },
      }),

      prisma.request_become_supplier.count({ where }),

    ]);

    return {
      data: {
        requests,stat
      },
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
          person: {
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

          documentSuppliers: {
            select: {
              file_url: true,
              file_type: true,
              upload_at: true,
            },
          },
          create_at:true,
          tax_code: true,
          status: true,
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
            person: true,
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
            person: {
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
          },
        });

        if (
          status === StatusBecomeSupplier.APPROVED &&
          updatedRequest.id &&
          updatedRequest.person?.id
        ) {
          await tx.person.update({
            where: { id: updatedRequest.person.id },
            data: {
              role_id: Role.ROLE_SUPPLIER,
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
